import puppeteer from "puppeteer";
import Page from 'puppeteer';

export default class BasePage {
    page: Page = null;

    constructor(page: Page) {
        this.page = page;
    }

    close = async () => await this.page.close();
    screenshot = async () => await this.page.screenshot();

    async wait(time): Promise<any> {
        return await this.page.waitFor(time);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async getUrl(): Promise<string> {
        return await this.page.url();
    }

    async waitAndClick(selector): Promise<any> {
        const elementHandler = await this.page.waitForSelector(selector); //need catch - handle himself
        if (elementHandler === null) new Error(`cannot find selector: ${selector}`);
        return await this.page.click(selector);
    }

    async waitAndType(selector: string, text: string): Promise<any> {
        const elementHandler = await this.page.waitForSelector(selector); //need catch else himself
        if (elementHandler === null) new Error(`cannot find selector: ${selector}`);
        return await this.page.type(selector, text);
    }

    async getCount(selector) {
        await this.page.waitForSelector(selector);
        const count = await this.page.$$eval(selector, items => items.length);
        return count;
    }

    async getText(selector: string): Promise<string> {
        try {
            await this.page.waitForSelector(selector);
            const text = await this.page.$eval(selector, (items) => items.textContent);
            //console.log(text);
            return text;
        } catch(error) {
            throw new Error(`Cannot get text of the selector: ${selector}. Error: ${error}`);
        }
    }

    async waitForXPathAndClick(xpath): Promise<any> {
        await this.page.waitForXPath(xpath)
        const elements = await this.page.$x(xpath)
        if(elements.length > 1) {
            console.warn("waitforXPathAndClick returned more then one result")
        }
        if(elements.length === 0) {
            console.warn(`xpath ${xpath} wasn't found`);
        }
        return await elements[0].click();
    }

    async isElementVisible(selector: string): Promise<boolean> {
        let visible = true;
        await this.page
            .waitForSelector(selector, { visible: true, timout: 3000 })
            .catch(() => {
                visible = false;
            });
        return visible;
    }

    async isXPathVisible(selector: string): Promise<boolean> {
        let visible = true;
        await this.page
            .waitForXPath(selector, { visible: true, timout: 3000 })
            .catch(() => {
                console.warn(`cannot find element with selector '${selector}'`);
                visible = false;
            });
        return visible;
    }
}
