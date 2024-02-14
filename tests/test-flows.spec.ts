import { test, expect } from '@playwright/test';
import { BASE_URL } from './constants/UrlConstants';
import { generateUsername } from 'unique-username-generator';
import { SearchPage } from './pages/SearchPage'


const usernames = [generateUsername('-'), generateUsername('',3),generateUsername('',2)]
for(const username of usernames){
  test(`Search multiple invalid usernames: Username ${username}`, async ({ page }) => {
    await page.goto(BASE_URL);
    let searchPage = new SearchPage(page);
    await searchPage.fillUsername(username);
    await searchPage._goButton.hover();
    await searchPage.clickOnGoBtn();
    await expect(searchPage._messageFailure).toBeVisible();
  });
}

const validUsers = ['hello', 'test', 'issue', 'bug']
for(const validUser of validUsers){
  test(`Search multiple usernames: Username ${validUser}`, async ({ page }) => {
    await page.goto(BASE_URL);
    let searchPage = new SearchPage(page);
    await searchPage.fillUsername(validUser);
    await searchPage._goButton.hover();
    await searchPage.clickOnGoBtn();
    await expect(searchPage._messageSuccess).toBeVisible();
  });
}


test(`Verify the link on the result is the right repo`, async ({ page,context }) => {
  await page.goto(BASE_URL);
  let searchPage = new SearchPage(page);
  await searchPage.fillUsername('bug');
  await searchPage._goButton.hover();
  await searchPage.clickOnGoBtn();
  let resultLinks = await page.getByRole('link');
  let expectedRepo = resultLinks[0].textContent();
  await page.click(resultLinks[0]);
  const newPage = await context.waitForEvent('page');
  await newPage.waitForLoadState();
  await expect(newPage.url()).toContain(expectedRepo);
});