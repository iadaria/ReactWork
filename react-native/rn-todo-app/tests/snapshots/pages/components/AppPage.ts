import BasePage from "../BasePage";
import { START_PAGE_URL } from "../../../../config";

export default class AppPage extends BasePage{
    constructor(page) {
        super(page);
        this.visit();
    }

    visit = async (html: string = START_PAGE_URL) => await this.page.goto(html);

    async isAddTodoDisplayed(): Promise<boolean> {
        const isInputDisplayed = await this.isXPathVisible("//input[@data-testid='addtodo-input']");
        const isButtonDisplayed = await this.isXPathVisible("//div[@data-testid='addtodo-button']");
        return isInputDisplayed && isButtonDisplayed;
    }  
    
    clickAddTodoButton = async (): Promise<any> =>
        await this.waitAndClick('div[data-testid=addtodo-button]');

    async isNavbarDisplayed(): Promise<boolean> {
        return await this.isXPathVisible("//*[@data-testid='navbar-title']");
    }

    async getNavBarTitle(): Promise<string> {
        return await this.getText('div[data-testid=navbar-title]');
    }

    async addTodo(todo: string) {//: Promise<boolean> {
        console.log(`Adding todo = '${todo}'...`);
        await this.waitAndType('input[data-testid=addtodo-input]', todo);
        await this.waitAndClick('div[data-testid=addtodo-button]');
        //return await this.isAddedTodoDisplayed(todo);
    }

    async addTodos(todos: Array<string>) {
        todos.forEach(async (todo) => {
            await this.waitAndType('input[data-testid=addtodo-input]', todo);
            await this.waitAndClick('div[data-testid=addtodo-button]');
            await this.isAddedTodoDisplayed(todo);
        });
    }

    getLengthOfTodos = async () => 
        await this.getCount(`[data-testid="todo-title"]`);

    isAddedTodoDisplayed = async (todo: string): Promise<boolean> =>
        await this.isXPathVisible(`//div[@data-testid="todo-title"][text()="${todo}"]`);


    async test() {
        return await this.page.$eval("div[data-testid=navbar-title]", (items) => items.textContent);
    }
}