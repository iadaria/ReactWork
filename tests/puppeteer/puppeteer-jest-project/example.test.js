import puppeteer from "puppeteer";

describe("Google Test", () => {
  let browser;
  let page; 
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, //headless(without show)
      slowMo: 50,
      devtools: true,
    });
    page = await browser.newPage();
  });

  it("should open google homepage", async () => {
    jest.setTimeout(15000);
    await page.goto("https://google.com");
    await page.waitFor(5000);
  });
});
