/**
 * Maipal Nagar Vehicle Register - one-time setup.
 * Run createVehicleForm() once; it creates the Google Form and its response Sheet.
 * Check View > Logs (or the Execution log) for the links.
 */
function createVehicleForm() {
  var form = FormApp.create('Maipal Nagar Vehicle Register');
  form.setDescription(
    'Register your vehicle so neighbours can contact you if your vehicle blocks theirs. ' +
    'Fill this once per vehicle. Submit again for a new vehicle or if details change.');
  form.setCollectEmail(false);
  form.setConfirmationMessage('Thank you! Your vehicle is registered in the Maipal Nagar Vehicle Register.');

  form.addTextItem().setTitle("Owner's full name").setRequired(true);
  form.addTextItem().setTitle('Tenement / house number').setRequired(true);
  form.addParagraphTextItem().setTitle('Full address').setRequired(true);

  var tenDigits = FormApp.createTextValidation()
    .setHelpText('Enter a 10-digit mobile number')
    .requireTextMatchesPattern('^[0-9]{10}$').build();
  form.addTextItem().setTitle('Mobile number').setHelpText('10 digits, without +91').setValidation(tenDigits).setRequired(true);
  form.addTextItem().setTitle('WhatsApp number (if different from mobile)').setHelpText('10 digits. Leave empty if same as mobile.').setValidation(tenDigits).setRequired(false);

  form.addMultipleChoiceItem().setTitle('Vehicle type')
    .setChoiceValues(['Car', 'Auto rickshaw']).setRequired(true);
  form.addTextItem().setTitle('Vehicle number plate').setHelpText('Example: GJ01AB1234').setRequired(true);
  form.addTextItem().setTitle('Vehicle brand').setHelpText('Example: Maruti Suzuki, Hyundai, Bajaj').setRequired(true);
  form.addTextItem().setTitle('Vehicle name').setHelpText('Example: Swift, i20, RE').setRequired(true);
  form.addTextItem().setTitle('Vehicle color').setHelpText('Example: White').setRequired(true);

  var ss = SpreadsheetApp.create('Maipal Nagar Vehicle Register (responses)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('Form (share this with residents): ' + form.getPublishedUrl());
  Logger.log('Form (edit): ' + form.getEditUrl());
  Logger.log('Sheet: ' + ss.getUrl());
}
