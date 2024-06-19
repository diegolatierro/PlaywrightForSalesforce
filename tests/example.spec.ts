import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { PageManager } from '../page-object/pageManager';
import { createAccount } from '../api/salesforceAPI';

/* API connection is not working now due to org configuration

test('create an account using Salesforce API', async ({ page }) => {
  const fakeName = faker.person.firstName()
  // Call the createAccount function
  await createAccount(`APITestAccountName ${fakeName}`);
});*/

test('Create and delete an account', async ({ page }) => {
  const pm = new PageManager(page);
  const fakeName = faker.person.firstName()

  await page.goto('https://login.salesforce.com/')
  await pm.login().loginToSalesforce('automation_org@altimetrik.com', 'Altimetrik.2024')
  await pm.login().searchApplication('Service')

  // Adding wait to ensure the search is completed and the service app is loaded
  await page.waitForLoadState('networkidle')

  await pm.account().createBasic(`AccountName ${fakeName}`)
  await pm.account().delete(`AccountName ${fakeName}`)
});

test('Create and delete Contact', async ({page})=>{
  const pm = new PageManager(page);
  const fakeName = faker.person.firstName()

  await page.goto('https://login.salesforce.com/')
  await pm.login().loginToSalesforce('automation_org@altimetrik.com', 'Altimetrik.2024')
  await pm.login().searchApplication('Service')

  // Adding wait to ensure the search is completed and the service app is loaded
  await page.waitForLoadState('networkidle')

  await pm.contact().createBasic(`ContactName ${fakeName}`)
  await pm.contact().delete(`ContactName ${fakeName}`)
})

