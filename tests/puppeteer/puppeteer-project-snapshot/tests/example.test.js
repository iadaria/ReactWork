const puppeteer = require("puppeteer");
const expect = require("chai").expect;

const { click, shouldNotExist, typeText } = require("../lib/helpers");

describe("My first puppeteer test", () => {
  let browser;
  let page;

  before(async function () {
    //because it's fast do it more slow with 'slowMo'
    browser = await puppeteer.launch({
      headless: false, //headless(without show)
      slowMo: 50,
      devtools: true,
    });
    page = await browser.newPage();
    await page.setDefaultTimeout(10000);
    await page.setDefaultNavigationTimeout(20000);
  });

  after(async function () {
    await browser.close();
  });

  beforeEach(async function () {
    //Runs before each test step
  });

  afterEach(async function () {
    //Runs after each test step
  });

  it("should launch the browser", async function () {
    await page.goto("https://devexpress.github.io/testcafe/example/");

    await typeText(page, "#developer-name", "Dasha");
    await click(page, "#submit-button"); //await page.waitFor(300); //pause
    await shouldNotExist(page, "#submit-button");

    await page.waitForSelector("h1");

    await page.reload();
    //await page.waitFor(30); //pause
    await page.waitForSelector("h1");
    //page.goBack();
  });
});

/*
 * const title = await page.title();
 * expect(title).to.be.a('string', 'Example Domain');
 */

/*
 * const url = await page.url();
 * expect(url).to.include('example.com');
 */

// const text = await page.$eval('h1', element => element.textContent);

/**
 * counting element of the page
 * one sign $ - element
 * second sign $ = multiple
 * const count = await page.$$eval('p', element => element.length)
 * epext(count).to.equal(2)
 */

/**
 * await page.setDefaultTimeout(1000)
 * await page.setDefaultNavigationTimeout(20000)
 */

/**
 * simulate event
 *  await page.waitForSelector('#search');
 *  await page.type('#searchTerm', 'Hellow World');
 *  await page.keyboard.press('Enter', { delay: 10});
 *  await page.waitFor(5000)
 */

/**
 * Xpath
 * await page.waitForSelector('h1');
 *
 * - or
 * await page.waitForXPath('//h1');
 *
 * - if element not exist
 * await page.waitForSelector('#signin_button)
 * await page.click('#signin_button');
 * await page.waitFor(() => !document.querySelector('#signing_in')) //until disappeared
 * or
 * await page.waitForSelector('#signing_button', { hidden: true, timeout: 3000 })
 *
 * await page.waitForSelector('#tabs > ul > li:nth-child(3) > a')
 * await page.click('#tabs > ul > li:nth-child(3) > a')
 */

/**
 * Measuring website 
 * const metrics = await page.evaluate(() => JSON.stringify(window.performance));
 * console.log(JSON.parse(metrics));
 */