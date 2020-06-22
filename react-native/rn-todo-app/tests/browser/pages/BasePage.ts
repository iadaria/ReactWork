import puppeteer from "puppeteer";
import { START_PAGE_URL } from "../../../config";

export default class BasePage {
    _page = null;

    async init(viewport) {

        const launchOptions = {
            headless: false,
            slowMo: 0,
            args: [
                "--no-sandbox",
                "--disable-setui-sandbox",
                "--disable-web-security"
            ]
        };

        const browser = await puppeteer.launch(launchOptions);
        const page = await browser.newPage();
        await page.setDefaultTimeout(20000);
        await page.setDefaultNavigationTimeout(20000);

        switch (viewport) {
            case "Mobile":
                const mobileViewport = puppeteer.devices['iPhone X'];
                await  page.emulate(mobileViewport);
                break;
            case "Tablet":
                const tabletViewport = puppeteer.devices['iPad landscape'];
                await  page.emulate(tabletViewport);
            case "Desktop":
                await  page.setViewport({ width: 800, height: 600 });
                break;
            default:
                throw new Error("Supported devices are only Mobile | Tablet | Desktop");
        }

        this._page = page;
    }

    get page() {
        return this._page;
    }

    async visit(html: string = START_PAGE_URL) {
        return await this._page.goto(html);
    }

    close = async () => await this._page.close();
    screenshot = async () => await this._page.screenshot();

    async wait(time): Promise<any> {
        return await this._page.waitFor(time);
    }

    async getTitle(): Promise<string> {
        return await this._page.title();
    }

    async getUrl(): Promise<string> {
        return await this._page.url();
    }

    async waitAndClick(selector, options = {}): Promise<any> {
        const elementHandler = await this._page.waitForSelector(selector); //need catch - handle himself
        if (elementHandler === null) new Error(`cannot find selector: ${selector}`);
        console.log('options', options);
        return await this._page.click(selector, options);
    }

    async waitAndType(selector: string, text: string): Promise<any> {
        const elementHandler = await this._page.waitForSelector(selector); //need catch else himself
        if (elementHandler === null) new Error(`cannot find selector: ${selector}`);
        return await this._page.type(selector, text);
    }

    async getCount(selector) {
        await this._page.waitForSelector(selector);
        const count = await this._page.$$eval(selector, items => items.length);
        return count;
    }

    async getText(selector: string): Promise<string> {
        try {
            await this._page.waitForSelector(selector);
            const text = await this._page.$eval(selector, (items) => items.textContent);
            //console.log(text);
            return text;
        } catch (error) {
            throw new Error(`Cannot get text of the selector: ${selector}. Error: ${error}`);
        }
    }

    async waitForXPathAndClick(xpath): Promise<any> {
        await this._page.waitForXPath(xpath)
        const elements = await this._page.$x(xpath)
        if (elements.length > 1) {
            console.warn("waitforXPathAndClick returned more then one result")
        }
        if (elements.length === 0) {
            console.warn(`xpath ${xpath} wasn't found`);
        }
        return await elements[0].click();
    }

    async isElementVisible(selector: string): Promise<boolean> {
        let visible = true;
        await this._page
            .waitForSelector(selector, { visible: true, timeout: 3000 })
            .catch(() => {
                visible = false;
            });
        return visible;
    }

    async isXPathVisible(selector: string): Promise<boolean> {
        let visible = true;
        await this._page
            .waitForXPath(selector, { visible: true, timeout: 3000 })
            .catch(() => {
                console.warn(`cannot find element with selector '${selector}'`);
                visible = false;
            });
        return visible;
    }

    async shouldNotXPathExist(selector: string) {
        let visible = true;
        await this._page
            .waitForXPath(selector, { hidden: true, timeout: 3000 })
            .catch(() => {
                console.warn(`Was found element with selector '${selector}'`);
                visible = false;
            });
        return visible;
    }

    async shouldNotElementExist(selector: string): Promise<boolean> {
        let visible = true;
        await this._page
            .waitForSelector(selector, { hidden: true, timeout: 3000 })
            .catch(() => {
                console.warn(`Was found element with selector '${selector}'`);
                visible = false;
            });
        return visible;
    }
}
