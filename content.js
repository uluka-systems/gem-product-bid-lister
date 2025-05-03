// content.js - Injected into the GeM Seller Bids page

(async function () {
    // Utility: delay helper
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    // Add overlay UI elements for progress and cancel without inline HTML
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '10px';
    overlay.style.right = '10px';
    overlay.style.zIndex = '9999';
    overlay.style.padding = '10px';
    overlay.style.backgroundColor = 'white';
    overlay.style.border = '1px solid #ccc';
    overlay.style.borderRadius = '5px';
    overlay.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';

    const label = document.createElement('div');
    label.style.marginBottom = '5px';
    label.textContent = 'Scraping in progress...';

    const progressBar = document.createElement('progress');
    progressBar.id = 'gemProgress';
    progressBar.value = 0;
    progressBar.max = 100;
    progressBar.style.width = '200px';

    const progressText = document.createElement('div');
    progressText.id = 'gemProgressText';
    progressText.style.fontSize = '12px';
    progressText.style.marginTop = '4px';
    progressText.style.textAlign = 'center';
    progressText.textContent = '0 / ? records';

    const cancelBtn = document.createElement('button');
    cancelBtn.id = 'cancelBtn';
    cancelBtn.style.marginTop = '5px';
    cancelBtn.textContent = 'Cancel';

    overlay.appendChild(label);
    overlay.appendChild(progressBar);
    overlay.appendChild(progressText);
    overlay.appendChild(document.createElement('br'));
    overlay.appendChild(cancelBtn);
    document.body.appendChild(overlay);

    let cancelRequested = false;
    cancelBtn.addEventListener('click', () => cancelRequested = true);

    // --- STEP 1: Select BOQ from multiselect dropdown ---
    const multiselectButton = document.querySelector('button.multiselect');
    if (multiselectButton) multiselectButton.click();
    await delay(500);
    const boqCheckbox = [...document.querySelectorAll('input[type="checkbox"]')]
      .find(el => el.value === 'home_boq_boql_boql_boq');
    if (boqCheckbox && !boqCheckbox.checked) boqCheckbox.click();
  
    // --- STEP 2: Select Product Bid/RAs ---
    const productCheckbox = document.getElementById('product');
    if (productCheckbox && !productCheckbox.checked) productCheckbox.click();
  
    // --- STEP 3 to 5: Scrape data page by page ---
    const data = [];
    let currentPage = 1;
    let totalRecords = 0;
    let totalPages = 1;
  
    const totalText = document.querySelector('.totalRecord span')?.textContent;
    const match = totalText?.match(/of (\d+) records/);
    if (match) {
      totalRecords = parseInt(match[1], 10);
      totalPages = Math.ceil(totalRecords / 5);
      progressText.textContent = `0 / ${totalRecords} records`;
    }

    while (true) {
      if (cancelRequested) break;

      console.log(`Scraping page ${currentPage}`);
      await delay(1500);
  
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        const bidNo = card.querySelector('.bid_no_hover')?.textContent.trim() || '';
        const link = card.querySelector('.bid_no_hover')?.href || '';
        const status = card.querySelector('.text-success, .text-danger')?.textContent.trim() || '';
        const items = card.querySelector('a[data-toggle="popover"]')?.textContent.trim() || '';
        const quantity = card.querySelector('.col-md-4 .row:nth-child(2)')?.textContent.trim().replace('Quantity:', '').trim() || '';
        const dept = card.querySelector('.col-md-5 .row:nth-child(2)')?.innerText.trim() || '';
        const start = card.querySelector('.start_date')?.textContent.trim() || '';
        const end = card.querySelector('.end_date')?.textContent.trim() || '';
  
        data.push({ bidNo, link, status, items, quantity, dept, start, end });
      });
  
      progressBar.value = Math.min((data.length / totalRecords) * 100, 100);
      progressText.textContent = `${data.length} / ${totalRecords} records`;

      const nextPage = document.querySelector(`#light-pagination a.page-link[href="#page-${currentPage + 1}"]`);
      if (!nextPage) break;
      nextPage.click();
      currentPage++;
    }
  
    // --- STEP 6: Download as Excel ---
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Product Bids');
    XLSX.writeFile(wb, 'gem_product_bids.xlsx');

    overlay.textContent = 'Scraping complete.';
    overlay.style.color = 'green';
    setTimeout(() => overlay.remove(), 3000);
  })();
  