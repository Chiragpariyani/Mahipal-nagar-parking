/**
 * Maipal Nagar Parking - one-time setup.
 * Run createVehicleForm() once; it creates the Google Form and its response Sheet,
 * with validation on every field. Open View > Execution log for the links.
 */
// Responses are stored in this existing sheet (a new 'Form Responses 1' tab is added).
var FORM_ID = '1jLicqPb5sUzGQUm40Ef2NAdTP6qC2Bo1KRQvRaC5XAI';
var SHEET_ID = '1VVXdBa4tnrKaqy1t7QIrNgDZ_5wBFIEh7f-6u2W6X3Q';

// Letters = English plus Hindi/Gujarati ranges. (Google Forms does not support \p{L}.)
var LETTERS = 'A-Za-z\u0900-\u0AFF';
var RULES = {
  "Owner's full name":        {p: "^[" + LETTERS + " .'-]{3,60}$", e: 'Enter your full name (3-60 letters, no numbers).'},
  'Tenement / house number':  {p: '^[A-Za-z0-9][A-Za-z0-9 /-]{0,9}$', e: 'Use letters, numbers, space, / or - only (max 10 characters).'},
  'Mobile number':            {p: '^[6-9][0-9]{9}$', e: 'Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9.'},
  'WhatsApp number (if different from mobile)': {p: '^[6-9][0-9]{9}$', e: 'Enter a valid 10-digit WhatsApp number starting with 6, 7, 8 or 9.'},
  'Vehicle number plate':     {p: '^([A-Za-z]{2}[ -]?[0-9]{1,2}[ -]?[A-Za-z]{1,3}[ -]?[0-9]{4}|[0-9]{2}[ -]?[Bb][Hh][ -]?[0-9]{4}[ -]?[A-Za-z]{1,2})$', e: 'Enter a valid number plate, for example GJ01AB1234.'},
  'Vehicle brand':            {p: '^[' + LETTERS + '0-9 .&+/-]{2,40}$', e: 'Enter the brand name (2-40 characters).'},
  'Vehicle name':             {p: '^[' + LETTERS + '0-9 .&+/-]{1,40}$', e: 'Enter the vehicle name (up to 40 characters).'},
  'Vehicle color':            {p: '^[' + LETTERS + ' /-]{3,30}$', e: 'Enter a color using letters only, for example White.'}
};

function validationFor(title) {
  return FormApp.createTextValidation().setHelpText(RULES[title].e)
    .requireTextMatchesPattern(RULES[title].p).build();
}

/** Repairs the validation rules on the EXISTING form. Run once, no new form or link needed. */
function fixValidation() {
  var form = FormApp.openById(FORM_ID);
  form.getItems(FormApp.ItemType.TEXT).forEach(function (item) {
    var t = item.getTitle();
    if (RULES[t]) item.asTextItem().setValidation(validationFor(t));
  });
  Logger.log('Validation fixed. Form link: ' + form.getPublishedUrl());
}

function createVehicleForm() {
  var form = FormApp.create('Maipal Nagar Parking - Vehicle Registration');
  form.setDescription(
    'Register your vehicle so neighbours can contact you if your vehicle blocks theirs. ' +
    'Fill this once per vehicle. Submit again for another vehicle, or if your details change.');
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setConfirmationMessage('Thank you! Your vehicle is registered with Maipal Nagar Parking.');

  function text(title, help, required) {
    var item = form.addTextItem().setTitle(title).setRequired(required);
    if (help) item.setHelpText(help);
    item.setValidation(validationFor(title));
    return item;
  }

  text("Owner's full name", 'Example: Ramesh Patel', true);
  text('Tenement / house number', 'Example: A-12', true);

  form.addParagraphTextItem().setTitle('Full address').setRequired(true)
    .setHelpText('House number, street, Maipal Nagar')
    .setValidation(FormApp.createParagraphTextValidation()
      .setHelpText('Please enter your complete address (at least 10 characters).')
      .requireTextLengthGreaterThanOrEqualTo(10).build());

  text('Mobile number', '10 digits, without +91 or spaces', true);
  text('WhatsApp number (if different from mobile)', '10 digits. Leave empty if same as mobile.', false);

  form.addMultipleChoiceItem().setTitle('Vehicle type')
    .setChoiceValues(['Car', 'Auto rickshaw']).setRequired(true);

  text('Vehicle number plate', 'Example: GJ01AB1234', true);
  text('Vehicle brand', 'Example: Maruti Suzuki, Hyundai, Bajaj', true);
  text('Vehicle name', 'Example: Swift, i20, RE', true);
  text('Vehicle color', 'Example: White', true);

  var ss = SpreadsheetApp.openById(SHEET_ID);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('FORM LINK (give this to me and residents): ' + form.getPublishedUrl());
  Logger.log('Form (edit): ' + form.getEditUrl());
  Logger.log('SHEET: ' + ss.getUrl());
}
