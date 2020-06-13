import HomePage from "../pages/HomePage";
import TopBar from "../pages/components/TopBar";
import LoginPage from "../pages/LoginPage";

import { USERNAME, PASSWORD, TIMEOUT } from "../config";

describe("Example", () => {
    let homepage: HomePage;
    let topbar: TopBar;
    let loginpage: LoginPage;

    beforeAll(async () => {
        jest.setTimeout(TIMEOUT);
        homepage = new HomePage();
        topbar = new TopBar();
        loginpage = new LoginPage();
    });

    it("homepage should work", async () => {
        await homepage.visit();
    });

    it("navbar should be displayed", async() => {
        await homepage.isNavbarDisplayed();
        await topbar.isTopBarDisplayed();
    });

    it("try fail to login", async () => {
        await loginpage.visit();
        await loginpage.isLoginFormDisplayed();
        await loginpage.login("login", "bla");
        await loginpage.wait(1000); //1 second
        await loginpage.isErrorDisplayed();
    });

    it("try success to login", async () => {
        await loginpage.visit();
        await loginpage.isLoginFormDisplayed();
        await loginpage.login(USERNAME, PASSWORD);
        await loginpage.wait(1000); //1 second
        //await loginpage.isLoginFormDisplayed();
        await loginpage.isLoginFormHidden();
    });

});