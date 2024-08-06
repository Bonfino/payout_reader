// popup.js

document.getElementById("extract").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: extractData,
    });
  });
});

// Definire la funzione di estrazione dati qui
function extractData() {
  let table = document.querySelector(
    "#mainContent ui-view ta-test-case-list-route test-cases responsive-table table > tbody"
  );

  let childs = table.querySelectorAll("tr:not(:first-child)");

  let sum = 0;

  Array.from(childs, (element) => {
    let result = element.querySelector(
      'td[data-column-title="Result "] > span'
    ).innerHTML;
    if (result.includes("Unclaimed")) return;

    result = element.querySelector(
      'td[data-column-title="Approval "] > span'
    ).innerHTML;
    if (result.includes("Approved")) return;

    let payout = element
      .querySelector('td[data-column-title="Payout "]')
      .innerHTML.slice(1);

    sum += parseFloat(payout);

    sum = (sum * 100);
    sum = Math.round(sum);
    sum = (sum / 100); 

    console.log(payout);
  });

  alert("Upcoming payout: " + sum);
}
