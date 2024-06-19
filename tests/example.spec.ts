import { test, expect } from '@playwright/test';
import { PageManager } from '../page-object/pageManager';
import { createAccount } from '../api/salesforceAPI';
import { generateFakeName } from '../page-object/helperBase';

/* API connection is not working now due to org configuration

test('create an account using Salesforce API', async ({ page }) => {
  const fakeName = faker.person.firstName()
  // Call the createAccount function
  await createAccount(`APITestAccountName ${fakeName}`);
});*/

test('Create and delete an account', async ({ page }) => {
  const pm = new PageManager(page);
  const fakeName = generateFakeName()
  await pm.initialize()

  await pm.account().createBasic(`AccountName ${fakeName}`)
  await pm.account().delete(`AccountName ${fakeName}`)
});

test('Create and delete Contact', async ({page})=>{
  const pm = new PageManager(page);
  const fakeName = generateFakeName()
  await pm.initialize()

  await pm.contact().createBasic(`ContactName ${fakeName}`)
  await pm.contact().delete(`ContactName ${fakeName}`)
})

