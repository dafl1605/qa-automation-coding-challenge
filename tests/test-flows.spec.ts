import { test, expect } from '@playwright/test';
import { BASE_URL } from './constants/UrlConstants';
import { generateUsername } from 'unique-username-generator';
import { SearchPage } from './pages/SearchPage'


const usernames = [generateUsername('-'), generateUsername('',3),generateUsername("", 3, 19)]
for(const username of usernames){
  test(`Search multiple usernames: Username ${username}`, async ({ page }) => {
    await page.goto(BASE_URL);
    let searchPage = new SearchPage(page);
    await searchPage.fillUsername(username);
    await searchPage._goButton.hover();
    await searchPage.clickOnGoBtn();
  });
}

const 
test(``)