import { Locator, Page } from "@playwright/test"

export class SearchPage{
    readonly  _userNameInput: Locator;
    readonly _goButton: Locator;
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
        this._userNameInput = page.locator('#username');
        this._goButton = page.locator('.submit');
    }

    async fillUsername(username: string){
        await this._userNameInput.fill(username);
    }

    async clickOnGoBtn(){
        await this._goButton.click();
    }
}