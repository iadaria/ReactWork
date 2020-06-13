import BasePage from "./BasePage";

export default class LoginPage extends BasePage {
    
    async visit() {
        await this.page.goto("http://zero.webappsecurity.com/login.html");
    }

    async isLoginFormDisplayed() {
        await this.page.waitForSelector('#login_form');
        await this.page.waitForSelector('#user_login');
        await this.page.waitForSelector('#user_password');
    }

    async isLoginFormHidden() {
        await this.page.waitForSelector('#login_form', { hidden: true } );
        await this.page.waitForSelector('#user_login', { hidden: true } );
        await this.page.waitForSelector('#user_password', { hidden: true });
    }

    async login(user, password) {
        await this.page.waitForSelector('#login_form');
        await this.page.type('#user_login', user);
        await this.page.type('#user_password', password);
        await this.page.click('.btn-primary');
    }

    isErrorDisplayed = async () =>  await this.page.waitForSelector(".alert-error");
}