import BasePage from "./BasePage";

export default class HomePage extends BasePage{
    
    async visit() {
        await this.page.goto("http://zero.webappsecurity.com/index.html");
        await this.page.waitForSelector('#nav');
    }

    async isNavbarDisplayed() {
        //check is loaded
        await this.page.waitForSelector('#pages-nav');
        await this.page.waitForSelector('#homeMenu');
        await this.page.waitForSelector('#onlineBankingMenu');
        await this.page.waitForSelector('#feedback');
    }

    async clickHomepageLink() {
        //await this.page.waitForSelector('#homeMenu');
        await this.page.click('#homeMenu');
    }

    async clickOnlineBankingLink() {
        //await this.page.waitForSelector('#onlineBankingMenu');
        await this.page.click('#onlineBankingMenu');
    }

    async clickFeedbackLink() {
       // await this.page.waitForSelector('#feedback');
        await this.page.click('#feedback');
    }

}