//import Page from "puppeteer";
//import Builder from "../snapshots/pages/builder";
import AppPage from "./pages/components/AppPage";

const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

describe("Should success added 3 dotos", () => {
    let appPage: AppPage;

    beforeAll(async () => {
        appPage = new AppPage();
        await appPage.init("Mobile");
    });

    afterAll(async () => {
        const page = appPage.page;
        const browser = page.browser();
        await appPage.close();
        await browser.close();
    });

    test("start page should work", async () => {
        await appPage.visit();
        const image = await appPage.screenshot();
        expect(image).toMatchImageSnapshot({});
    });
    
    test("AppPage should be displayed", async () => {
        expect(await appPage.isAddTodoDisplayed()).toBeTruthy();
        expect(await appPage.isNavbarDisplayed()).toBeTruthy();
    });

    test("navbar should be displayed", async () => {
        const title = await appPage.getNavBarTitle();
        expect(title).toEqual("Todo App");
    });

    test("add 3 todo `success`", async (done) => {
        const todos = ["the first todo", "the second todo", "the third todo"];

        await appPage.addTodo(todos[0]);
        expect(await appPage.isAddedTodoDisplayed(todos[0])).toBeTruthy();

        await appPage.addTodo(todos[1]);
        expect(await appPage.isAddedTodoDisplayed(todos[1])).toBeTruthy();

        await appPage.addTodo(todos[2]);
        expect(await appPage.isAddedTodoDisplayed(todos[2])).toBeTruthy();

        expect(await appPage.getLengthOfTodos()).not.toBe(2);

        const image = await appPage.screenshot();
        expect(image).toMatchImageSnapshot({});
        
        done();
    }, 30000);
});

describe("Should fail added todos", () => {
    let appPage: AppPage;

    beforeAll(async () => {
        appPage = new AppPage();
        await appPage.init("Mobile");
        await appPage.visit();
    });

    afterAll(async () => {
        const page = appPage.page;
        const browser = page.browser();
        await appPage.close();
        await browser.close();
    });

    test("enter empty string and click 'Add'", async () => {
        await appPage.clickAddTodoButton();
        expect(await appPage.isEmptyTodos()).toBeTruthy();

        expect(await appPage.screenshot()).toMatchImageSnapshot({});
    });


});