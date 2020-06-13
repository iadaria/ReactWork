const { Given, When, Then, Before, After } = require('cucumber');

Before(async function() {
    return await this.launchBrowser();
});

After(async function() {
    return await this.closeBrowser();
});

Given("I open login page", async function() {
    return await this.fillLoginForm();
});

Given("I click on submit button", async function() {
    return await this.submitLogin();
});

Given("I expect to see application content", async function() {
    return await this.verifySuccessfulLogin();
});