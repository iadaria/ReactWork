import puppeteer from 'puppeteer';
import { step } from 'mocha-steps';
import Page from "../builder";

describe("Config test", () => {
    let browser;
    let page;
    let testPage;
    let mobilePage;

    before(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        await page.setDefaultTimeout(7000);

        testPage = await Page.build("Desktop");
        mobilePage = await Page.build("Mobile");
    })

    after(async() => {
        await browser.close();
    }); 
    it("should work", () => {
        console.log("Yeay");
    });

    step("should load goole homepage", async() => {
        await page.goto("https://google.com");
        await page.waitAndClick('#onlineBankingMenu');
        await page.waitFor(500);
    });

    step("step 2 should fail", async() => await page.waitForSelector("#FAIL") );
    step("step 3", async() => console.log("From step 3"));
    step("step 4", async() => console.log("From step 4"));
});