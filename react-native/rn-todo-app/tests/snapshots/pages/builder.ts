import puppeteer, { defaultArgs } from 'puppeteer';

export default class Builder {
    page = null;
    constructor(page: object) { this.page = page; }

    static async build(viewport: string) {
        const launchOptions = {
            headless: true,
            slowMo: 0,
            args: [
                "--no-sandbox",
                "--disable-setui-sandbox",
                "--disable-web-security"
            ]
        };

        const browser = await puppeteer.launch(launchOptions);
        const page = await browser.newPage();
        const extendedPage = new Builder(page);
        await page.setDefaultTimeout(10000);

        switch(viewport) {
            case "Mobile":
                const mobileViewport = puppeteer.devices['iPhone X'];
                await page.emulate(mobileViewport);
                break;
            case "Tablet":
                const tabletViewport = puppeteer.devices['iPad landscape'];
                await page.emulate(tabletViewport);
            case "Desktop":
                await page.setViewport({ width: 800, height: 600});
                break;
            default:
                throw new Error("Supported devices are only Mobile | Tablet | Desktop");
        }

        return new Proxy(extendedPage, {
            get: function(_target, property) {
                return extendedPage[property] || browser[property] || page[property];
            }
        });
    }

    close = async () => await this.page.close();
    screenshot = async () => await this.page.screenshot();

    async waitAndClick(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }

    async waitAndType(selector: string, text: string) {
        await this.page.waitForSelector(selector);
        await this.page.type(selector, text);
    }

    async getCount(selector) {
        await this.page.waitForSelector(selector);
        const count = await this.page.$$eval(selector, items => items.length);
        return count;
    }

    async waitForXPathAndClick(xpath) {
        await this.page.waitForXPath(xpath)
        const elements = await this.page.$x(xpath)
        if(elements.length > 1) {
            console.warn("waitforXPathAndClick returned more then one result")
        }

        await elements[0].click();
    }

    async isElementVisible(selector) {
        let visible = true;
        await this.page
            .waitForSelector(selector, { visible: true, timout: 3000 })
            .catch(() => {
                visible = false;
            });
        return visible;
    }

    async isXPathVisible(selector) {
        let visible = true;
        await this.page
            .waitForXPath(selector, { visible: true, timout: 3000 })
            .catch(() => {
                visible = false;
            });
        return visible;
    }
}