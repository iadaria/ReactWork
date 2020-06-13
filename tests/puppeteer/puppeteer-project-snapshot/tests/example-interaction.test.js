const puppeteer = require('puppeteer');

describe("My second puppeteer test", () => {
  it("should input and submit the browser", async function() {
    //because it's fast do it more slow with 'slowMo'
    const browser = await puppeteer.launch({ 
      headless: false,  //show
      //slowMo: 10,
      devtools: true
    });
    const page = await browser.newPage();
    await page.goto("https://devexpress.github.io/testcafe/example/");
    // input
    await page.type('#developer-name', 'Mike', {delay : 200 });
    // checkbox
    //await page.click('#tried-test-case', { clickCount: 1}) //count of click
    // select list
    await page.select('#preferred-interface', 'JavaScript API');
    await page.click('#submit-button');
    await page.waitFor(2000);
    await browser.close();
  });

});
