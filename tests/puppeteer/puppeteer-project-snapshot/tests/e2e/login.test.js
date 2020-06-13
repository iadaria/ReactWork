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

  it("Login Test - Invalid Credentials", async function () {
    await page.waitForSelector("#signin_button");
    await page.click("#signin_button");
    await page.waitForSelector("#login_form");
    await page.type("#user_login", "invalid creds");
    await page.type("#user_password", "invalid password");
    await page.click("#user_remember_me");
    await page.click('input[type="submit"]');
    await page.waitForSelector(".alert-error");
  });

  it("Login Test - Valid Credentials", async function () {});
});
