import { test } from '../page-object/baseTest';
import { PageManager } from '../page-object/pageManager';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
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
        
    });


    test('Create and delete Account', async ({ page }) => {
      pm.initialize('Service')
      const accountName = `Account ${faker.company.name()}`;
      // Create Account
      await pm.account().createBasic(accountName);
      // Delete Account
      await pm.account().delete(accountName);
  });

  test('Create and delete Contact', async ({ page }) => {
      pm.initialize('Service')
      const contactName = `Contact ${faker.person.firstName()}`;
      // Create Contact
      await pm.contact().createBasic(contactName);
      // Delete Contact
      await pm.contact().delete(contactName);
  });

  test('Create and delete Case', async ({ page }) => {
      pm.initialize('Service')
      const caseSubject = `Case ${faker.lorem.sentence()}`;
      // Create Case
      await pm.case().createBasic(caseSubject);
      // Delete Case
      await pm.case().delete();
  });

  test('Create and delete Opportunity', async ({ page }) => {
    pm.initialize('Sales')
    const opportunityName = `Opportunity ${faker.company.name()}`;
    const closeDate = format(new Date(2024, 11, 31), 'dd/MM/yyyy'); // Format date as 31/12/2024
    const stage = 'Prospecting'; // Adjust as needed

    // Create Opportunity
    await pm.opportunity().createBasic(opportunityName, closeDate, stage);
    
    // Delete Opportunity
    await pm.opportunity().delete(opportunityName);
});

test('Create and delete Lead', async ({ page }) => {
  pm.initialize('Sales')
  const leadName = `${faker.person.firstName()} ${faker.person.lastName()}`;
  const companyName = faker.company.name();
  // there is an error de pop up in salesforce sometimes
  // Create Lead
  await pm.lead().createBasic(leadName, companyName);

  // Delete Lead
  await pm.lead().delete(leadName);
});