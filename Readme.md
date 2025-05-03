# GeM Helper – Product Bids Scraper

**GeM Helper – Product Bids** is a Chrome Extension designed to automate the extraction of Product Bid/RA listings from the [Government e-Marketplace (GeM)](https://bidplus.gem.gov.in/seller-bids) seller dashboard. It scrapes bid entries, paginates through the entire dataset, and exports all results to an Excel file.

---

## 🚀 Features

- Automatically selects **BOQ** and **Product Bid/RAs** filters
- Iterates through all result pages
- Extracts detailed bid data:
  - Bid number & link
  - Participation status
  - Item details
  - Quantity
  - Department
  - Start & end dates
- Displays a real-time progress bar
- Allows you to cancel scraping at any point
- Downloads the data as an Excel `.xlsx` file using [SheetJS (xlsx)](https://sheetjs.com)

---

## 🧩 Installation

1. Clone or download this repository.
2. Go to `chrome://extensions` in your Chrome browser.
3. Enable **Developer mode** (top-right toggle).
4. Click **"Load unpacked"** and select the folder containing this extension.

---

## 🗂 Project Structure

- `manifest.json`: Chrome extension configuration
- `content.js`: Main scraping logic injected into the GeM seller bids page
- `xlsx.full.min.js`: SheetJS library for Excel export
- `icons/`: Placeholder icons for the extension

---

## 📦 Dependencies

- [SheetJS](https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js) (included as `xlsx.full.min.js`)

---

## ✅ How to Use

1. Navigate to: [https://bidplus.gem.gov.in/seller-bids](https://bidplus.gem.gov.in/seller-bids)
2. The extension will auto-run:
   - BOQ + Product filters applied
   - All pages processed
   - Progress bar and cancel button appear at the top-right
3. Once complete or interrupted, an Excel file (`gem_product_bids.xlsx`) will be downloaded with available data.

---

## 🛑 CSP Compatibility

- No inline scripts or event handlers are used.
- All DOM manipulations follow Chrome Extension Content Security Policy (CSP) for Manifest V3.

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 👨‍💻 Author

Developed by Uluka Systems with dollops of help from ChatGPT.

