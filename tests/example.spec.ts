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
      await pm.account().createBasic({ 'Name': accountName });
      // Delete Account
      await pm.account().delete(accountName);
  });

  test('Create and delete Contact', async ({ page }) => {
      pm.initialize('Service')
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email();
      // Create Contact
      await pm.contact().createBasic({ 'First Name': firstName, 'Last Name': lastName, 'Email': email });
      // Delete Contact -   NOT WORKING AS EXPECTED
      await pm.contact().delete(`${firstName} ${lastName}`);
  });

  test('Create and delete Case', async ({ page }) => {
      pm.initialize('Service')
      const caseSubject = `Case ${faker.lorem.sentence()}`;
      // Create Case
      const caseNumber = await pm.case().createBasic({
        'Subject': caseSubject,
        'Status': 'New',
        'Case Origin': 'Phone'
      });

      // Delete Case
      await pm.case().delete(caseNumber);
  });

  test('Create and delete Opportunity', async ({ page }) => {
    pm.initialize('Sales')
    const opportunityName = `Opportunity ${faker.company.name()}`;
    const closeDate = format(new Date(2024, 11, 31), 'dd/MM/yyyy'); // Format date as 31/12/2024
    const stage = 'Prospecting'; // Adjust as needed

    // Create Opportunity
    await pm.opportunity().createBasic({
      'Opportunity Name': opportunityName,
      'Close Date': closeDate,
      'Stage': stage
    });
    
    // Delete Opportunity
    await pm.opportunity().delete(opportunityName);
});

test('Create and delete Lead', async ({ page }) => {
  pm.initialize('Sales')
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const companyName = faker.company.name();
  const leadName = `${firstName} ${lastName}`;
  // there is an error de pop up in salesforce sometimes
  // Create Lead
  await pm.lead().createBasic({
    'First Name': firstName,
    'Last Name': lastName,
    'Company': companyName
  });

  // Delete Lead
  await pm.lead().delete(leadName);
});