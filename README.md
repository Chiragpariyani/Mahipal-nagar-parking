# Maipal Nagar Parking

Free setup, about 10 minutes. No server, no payment.

## 1. Create the form and sheet (one time)
1. Open https://script.google.com and sign in with the Google account that should own the register.
2. Click **New project**. Delete the sample code and paste all of `create-form.gs`.
3. Click **Save**, choose the function `createVehicleForm` in the toolbar, click **Run**.
4. Click **Review permissions**, choose your account, then **Advanced > Go to project (unsafe) > Allow**. This is normal for your own script.
5. Open **Execution log** at the bottom. Copy the **FORM LINK** and the **SHEET** link.

## 2. Publish the sheet as CSV
1. Open the SHEET link, then **File > Share > Publish to web**.
2. Choose **Form responses 1** and **Comma-separated values (.csv)**, then **Publish**.
3. Copy the link it shows.

## 3. Configure the page
Edit `config.js`:
```js
const SHEET_CSV_URL = "<CSV link from step 2>";
const FORM_URL      = "<FORM LINK from step 1>";
```

## 4. Host it (free)
Repo **Settings > Pages**: deploy from branch `main`, folder `/ (root)`.
Live at https://chiragpariyani.github.io/Mahipal-nagar-parking/

## Links to share in the WhatsApp group
- Search a vehicle: https://chiragpariyani.github.io/Mahipal-nagar-parking/
- Register a vehicle: https://chiragpariyani.github.io/Mahipal-nagar-parking/register.html

## Notes
- If a plate is submitted again, the latest entry wins.
- The page asks search engines not to index it, but anyone with the link can open it. Share the link only inside the society.
