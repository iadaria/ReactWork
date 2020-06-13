import puppeteer from 'puppeteer';
import { step } from 'mocha-steps';
import { expect } from 'chai';

import Page from "../builder";
import LoginPage from '../pages/LoginPage';


describe("Mocha steps demo", () => {
    let page;
    let loginPage;

    before(async () => {
        page = await Page.build("Desktop");
        loginPage = new LoginPage(page);
    })

    after(async() => {
        await page.close();
    }); 
    it("should work", () => {
        console.log("Yeay");
    });

    step("should load goole homepage", async() => {
        await page.goto("https://google.com");
    });

    step("step 2 should fail", async() => await page.waitForSelector("#FAIL") );
    step("step 3", async() => console.log("From step 3"));
    step("step 4", async() => console.log("From step 4"));

    step("should load google homepage", async() => {
        await page.goto("https://zero.webappsecurity.com");
        const signInButton = await page.isElementVisible("#signin_button");
        expect(signInButton).to.be.true;
    });

    step("should load google homepage", async() => {
        await page.waitAndType('#user_login', "username");
        await page.waitAndClick('.btn-primary');
        const navbar = await page.isElementVisible('.nav-tabs');
        expect(navbar).to.be.true;
    });

    step("should have 6 navbar links", async() => {
        expect(await page.getCount(".nav-tabs li")).to.equal(6);
    });

    step("should login to application", async () => {
        await loginPage.login("username");
        expect(await page.isElementVisible('.nav-tabs')).to.be.true;
    });
});