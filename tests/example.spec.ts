import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { PageManager } from '../page-object/pageManager';
import { createAccount } from '../api/salesforceAPI';


test('Create an Account in SF', async ({page}) =>{
  const pm = new PageManager(page)

  const fakeName = faker.person.firstName()
  const fakeLastname = faker.person.lastName()
  const fakeEmail = faker.internet.email()
  const fakePhone = faker.phone.number()

  await page.goto('https://login.salesforce.com/')
  await pm.login().loginToSalesforce('automation_org@altimetrik.com','Altimetrik.2024')
  await pm.login().searchApplication('Service')
  await pm.sales().clickOnNewAccount()
  await pm.sales().clickOnNewButton()
  await pm.sales().createAnAccount(`AccountName ${fakeName}`)
})

test('create an account using Salesforce API', async ({ page }) => {
  const fakeName = faker.person.firstName()
  // Call the createAccount function
  await createAccount(`APITestAccountName ${fakeName}`);
});

//automation_org@altimetrik.com / Altimetrik.2024
//customer key: 3MVG9JJwBBbcN47KDHo767ak9S9sVDfH5BXIsA_zCXa47UiCG_oWVpiWGWU4Q9cC.pJk7oHA6lTXMy5mrNzsR
//customer secret: 7CBC093317028E48F9E92B560B5811F2CC8BF0A65975C64ED65BA6E93CBCADFB
//security token: Ni6jJIZFNFW7omwUuX7r8KFzA
