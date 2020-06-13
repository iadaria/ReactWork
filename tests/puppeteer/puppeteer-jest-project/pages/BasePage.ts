import puppeteer from "puppeteer";
import Page from 'puppeteer';

export default class BasePage {
    page: any = null;
    constructor() {
        this.page = page;
    }
    async wait(time) {
        await this.page.waitFor(time);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async getUrl(): Promise<string> {
        return await this.page.url();
    }
}
