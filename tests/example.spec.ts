import { test } from '../page-object/baseTest';
import { PageManager } from '../page-object/pageManager';
import { faker } from '@faker-js/faker';
import { createAccount } from '../api/salesforceAPI';
//import { generateFakeName } from '../page-object/helperBase';

/* API connection is not working now due to org configuration

test('create an account using Salesforce API', async ({ page }) => {
  const fakeName = faker.person.firstName()
  // Call the createAccount function
  await createAccount(`APITestAccountName ${fakeName}`);
});*/
let pm: PageManager;

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
        pm.initialize()
    });


    test('Create and delete Account', async ({ page }) => {
      const accountName = `Account ${faker.company.name()}`;
      // Create Account
      await pm.account().createBasic(accountName);
      // Delete Account
      await pm.account().delete(accountName);
  });

  test('Create and delete Contact', async ({ page }) => {
      const contactName = `Contact ${faker.person.firstName()}`;
      // Create Contact
      await pm.contact().createBasic(contactName);
      // Delete Contact
      await pm.contact().delete(contactName);
  });

  test('Create and delete Case', async ({ page }) => {
      const caseSubject = `Case ${faker.lorem.sentence()}`;
      // Create Case
      await pm.case().createBasic(caseSubject);
      // Delete Case
      await pm.case().delete();
  });