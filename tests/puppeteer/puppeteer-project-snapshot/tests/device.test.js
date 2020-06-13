const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('My first puppeteer test', () => {
	let browser
	let page
  
	before(async function () {
		//because it's fast do it more slow with 'slowMo'
		browser = await puppeteer.launch({
			headless: false, //headless(without show)
			slowMo: 10,
			devtools: true,
    });
    const context = await browser.createIncognitoBrowserContext();
    //page = await browser.newPage();
    page = await context.newPage();
    await page.setDefaultTimeout(10000);
    await page.setDefaultNavigationTimeout(20000);
  });
  
  after(async function() {
    await browser.close();
  });

  it("Desktop Device Test", async function() {
    await page.setViewport({ width: 1650, height: 1050});
    await page.goto('https://www.example.com');
    await page.waitFor(2000);
  });

  it("Tablet Device Test", async function() {
    const tablet = puppeteer.devices['iPad landscape'];
    await page.emulate(tablet);
    await page.goto('https://www.example.com');
    await page.waitFor(2000);
  });

  it("Mobile Device Test", async function() {
    const mobile = puppeteer.devices['iPhone X'];
    await page.emulate(mobile);
    await page.goto('https://www.example.com');
    await page.waitFor(2000);
  });

}); //.describe