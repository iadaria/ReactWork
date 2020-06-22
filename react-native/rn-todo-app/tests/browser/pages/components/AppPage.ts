import BasePage from "../BasePage";

export default class AppPage extends BasePage {
    
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

    async addTodo(todo: string) {
        await this.waitAndType('input[data-testid=addtodo-input]', todo);
        await this.waitAndClick('div[data-testid=addtodo-button]');
    }

    async addTodos(todos: Array<string>) {
        todos.forEach(async (todo) => {
            await this.waitAndType('input[data-testid=addtodo-input]', todo);
            await this.waitAndClick('div[data-testid=addtodo-button]');
            await this.isAddedTodoDisplayed(todo);
        });
    }

    async removeTodo(todo: string){
        await this.waitAndClick(
            `div[data-testid=todo-title]`,
            { delay: 3000 }
        );
    }

    async isAddedTodoDisplayed(todo: string): Promise<boolean> {
        return await this.isXPathVisible(`//div[@data-testid="todo-title"][text()="${todo}"]`);
    }

    getLengthOfTodos = async () =>
        await this.getCount(`[data-testid="todo-title"]`);

    isEmptyOneTodo = async (todo: string): Promise<boolean> =>
        await this.shouldNotXPathExist(`//div[@data-testid="todo-title"][text()="${todo}"]`);
        
    isEmptyTodos = async (): Promise<boolean> =>
        await this.shouldNotXPathExist(`//div[@data-testid="todo-title"]`);

    async test() {
        return await this.page.$eval("div[data-testid=navbar-title]", (items) => items.textContent);
    }
}