import BasePage from "../BasePage";

export default class TopBar extends BasePage {
    async isTopBarDisplayed() {
        await this.page.waitForSelector('.brand'); //class
        await this.page.waitForSelector('#signin_button');
    }

    async clickSignInButton() {
        await this.page.click('#signin_button');
    }
}