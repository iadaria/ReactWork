const puppeteer = require("puppeteer");
const expect = require("chai").expect;

describe("My first puppeteer test", () => {
  let browser;
  let page;

  before(async function () {
    //because it's fast do it more slow with 'slowMo'
    browser = await puppeteer.launch({
      headless: false, //headless(without show)
      slowMo: 10,
      //devtools: true,
    });
    const context = await browser.createIncognitoBrowserContext();
    //page = await browser.newPage();
    page = await context.newPage();
    await page.setDefaultTimeout(10000);
    await page.setDefaultNavigationTimeout(20000);
  });

  after(async function () {
    await browser.close();
  });

  beforeEach(async function () {
    await page.goto("http://zero.webappsecurity.com/index.html");
  });

  it("Display Feedback Form", async function () { /** TODO Go to feedback page */});

  it("Submit Feedback Form", async function () { /** TODO enter data to form of the feedback */});

  it("Display Result Page", async function () {
      //...
      /**
       * const url = await page.url();
       * expect(url).to.include('/sendFeedback.html');
       */
  });
});
