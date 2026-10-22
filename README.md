# Maipal Nagar Vehicle Register

Free setup, about 15 minutes. No server, no payment.

## 1. Create the form and sheet
1. Go to https://script.google.com and click **New project**.
2. Paste the contents of `create-form.gs`, then click **Run** (function `createVehicleForm`) and allow access.
3. Open **Execution log**. Copy the *Form (share this with residents)* link and open the *Sheet* link.

## 2. Publish the sheet as CSV
In the Sheet: **File > Share > Publish to web** > choose *Form responses 1* and **CSV** > Publish. Copy the link.

## 3. Configure the page
In `config.js` set:
```js
const SHEET_CSV_URL = "<CSV link from step 2>";
const FORM_URL      = "<form link from step 1>";
```

## 4. Host it (free)
Repo **Settings > Pages**: deploy from branch `main`, folder `/ (root)`. Live at https://chiragpariyani.github.io/Mahipal-nagar-parking/
Share the page link in the society WhatsApp group and pin it.

## Notes
- If a plate is submitted again, the latest entry wins.
- The page asks search engines not to index it, but anyone with the link can open it. Share the link only inside the society.
