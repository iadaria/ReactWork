const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
//const expect = require('chai').expect;
expect.extend({ toMatchImageSnapshot });


describe('My first snapshot test', () => {
	let browser;
	let page;

	beforeAll(async () => {
		//because it's fast do it more slow with 'slowMo'
		browser = await puppeteer.launch({
			headless: true, //headless(without show)
			slowMo: 50,
			devtools: true,
		})
		page = await browser.newPage();
		await page.setDefaultTimeout(10000);
		await page.setDefaultNavigationTimeout(20000);
	});

	afterAll(async function () {
		await browser.close()
    });
    
    test("homepage shapshot", async() => {
        await page.goto("https://example.com/");
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot({
            //failureThreshold: .01,
            //failureThresholdType:'percent' //'pixel
        });
    });

    test("single element snapshot", async() => {
        await page.goto("https://example.com/");
        const h1 = await page.waitForSelector('h1');
        const image = await h1.screenshot();
        expect(image).toMatchImageSnapshot({
            //failureThreshold: .01,
            //failureThresholdType:'percent' //'pixel
        });
    });

});