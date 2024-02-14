import { test, expect } from '@playwright/test';
import { BASE_URL } from './constants/UrlConstants';
import { SearchPage } from './pages/SearchPage'

let searchPage;

test.beforeEach(async({page}) => {
  await page.goto(BASE_URL);
  searchPage = new SearchPage(page);
});

const validUsers = ['hello', 'test', 'issue', 'bug']
for(const validUser of validUsers){
  test(`Search multiple usernames: Username ${validUser}`, async () => {
    await searchPage.fillUsername(validUser);
    await searchPage._goButton.hover();
    await searchPage.clickOnGoBtn();
    await expect(searchPage._messageSuccess).toBeVisible();
  });
}


test(`Verify the link on the result is the right repo`, async ({ page,context }) => {
  await searchPage.fillUsername('bug');
  await searchPage._goButton.hover();
  await searchPage.clickOnGoBtn();
  let resultLinks = await page.getByRole('link');
  let expectedRepo = await resultLinks.first().textContent();
  await resultLinks.first().click();
  const newPage = await context.waitForEvent('page');
  await newPage.waitForLoadState();
  await expect(newPage.url()).toContain(expectedRepo);
});