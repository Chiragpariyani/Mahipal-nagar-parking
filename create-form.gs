/**
 * Maipal Nagar Parking - one-time setup.
 * Run createVehicleForm() once; it creates the Google Form and its response Sheet,
 * with validation on every field. Open View > Execution log for the links.
 */
// Responses are stored in this existing sheet (a new 'Form Responses 1' tab is added).
var SHEET_ID = '1VVXdBa4tnrKaqy1t7QIrNgDZ_5wBFIEh7f-6u2W6X3Q';

function createVehicleForm() {
  var form = FormApp.create('Maipal Nagar Parking - Vehicle Registration');
  form.setDescription(
    'Register your vehicle so neighbours can contact you if your vehicle blocks theirs. ' +
    'Fill this once per vehicle. Submit again for another vehicle, or if your details change.');
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setConfirmationMessage('Thank you! Your vehicle is registered with Maipal Nagar Parking.');

  function text(title, help, pattern, error, required) {
    var item = form.addTextItem().setTitle(title).setRequired(required);
    if (help) item.setHelpText(help);
    item.setValidation(FormApp.createTextValidation()
      .setHelpText(error).requireTextMatchesPattern(pattern).build());
    return item;
  }

  // Letters (any language), spaces, dots, apostrophes and hyphens; 3-60 characters.
  text("Owner's full name", 'Example: Ramesh Patel',
       "^[\\p{L} .'-]{3,60}$", 'Enter your full name (3-60 letters, no numbers).', true);

  // Examples: A-12, B 7, 45, C/3
  text('Tenement / house number', 'Example: A-12',
       '^[A-Za-z0-9][A-Za-z0-9 /-]{0,9}$', 'Use letters, numbers, space, / or - only (max 10 characters).', true);

  form.addParagraphTextItem().setTitle('Full address').setRequired(true)
    .setHelpText('House number, street, Maipal Nagar')
    .setValidation(FormApp.createParagraphTextValidation()
      .setHelpText('Please enter your complete address (at least 10 characters).')
      .requireTextLengthGreaterThanOrEqualTo(10).build());

  // Indian mobile: 10 digits starting with 6-9.
  text('Mobile number', '10 digits, without +91 or spaces',
       '^[6-9][0-9]{9}$', 'Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9.', true);
  text('WhatsApp number (if different from mobile)', '10 digits. Leave empty if same as mobile.',
       '^[6-9][0-9]{9}$', 'Enter a valid 10-digit WhatsApp number starting with 6, 7, 8 or 9.', false);

  form.addMultipleChoiceItem().setTitle('Vehicle type')
    .setChoiceValues(['Car', 'Auto rickshaw']).setRequired(true);

  // Standard: GJ01AB1234 / GJ 01 AB 1234 / GJ-01-A-1234. Bharat series: 22BH1234AA.
  text('Vehicle number plate', 'Example: GJ01AB1234',
       '(?i)^([A-Z]{2}[ -]?[0-9]{1,2}[ -]?[A-Z]{1,3}[ -]?[0-9]{4}|[0-9]{2}[ -]?BH[ -]?[0-9]{4}[ -]?[A-Z]{1,2})$',
       'Enter a valid number plate, for example GJ01AB1234.', true);

  text('Vehicle brand', 'Example: Maruti Suzuki, Hyundai, Bajaj',
       '^[\\p{L}0-9 .&+/-]{2,40}$', 'Enter the brand name (2-40 characters).', true);
  text('Vehicle name', 'Example: Swift, i20, RE',
       '^[\\p{L}0-9 .&+/-]{1,40}$', 'Enter the vehicle name (up to 40 characters).', true);
  text('Vehicle color', 'Example: White',
       '^[\\p{L} /-]{3,30}$', 'Enter a color using letters only, for example White.', true);

  var ss = SpreadsheetApp.openById(SHEET_ID);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('FORM LINK (give this to me and residents): ' + form.getPublishedUrl());
  Logger.log('Form (edit): ' + form.getEditUrl());
  Logger.log('SHEET: ' + ss.getUrl());
}
