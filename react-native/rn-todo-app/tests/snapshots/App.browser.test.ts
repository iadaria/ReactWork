import Page from "./pages/builder";
import AppPage from "./pages/components/AppPage";

const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

describe("Should success added 3 dotos", () => {
    let page: Page;
    let appPage: AppPage;

    beforeAll(async () => {
        console.warn('Executed before each...')
        page = await Page.build("Mobile");
        appPage = new AppPage(page);
    });

    /* afterAll(async () => await page.close());

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

    test("add 3 todo `success`", async () => {
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
    }); */
});

/* describe("Should fail added todos", () => {
    let page: Page;
    let appPage: AppPage;

    beforeAll(async () => {
        console.warn('Executed before each...')
        page = await Page.build("Mobile");
        appPage = new AppPage(page);
    });

    afterAll(async () => await page.close());

    test("start page should work", async () => {
        await appPage.visit();
        const image = await appPage.screenshot();
        expect(image).toMatchImageSnapshot({});
    });

    test("enter empty string and click 'Add'", async () => {
        await appPage.clickAddTodoButton();
        expect(await appPage.getLengthOfTodos()).toBe(0);
    });


});
 */