// example.spec.ts
import { test } from '@playwright/test';
import { PageManager } from '../page-object/pageManager';
import { DataDrivenTest } from '../page-object/dataDrivenTest';

test.describe('Data-Driven Entity Management', () => {
    let dataDrivenTest: DataDrivenTest;
    let pm: PageManager;

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
        dataDrivenTest = new DataDrivenTest(page);
    });

    test('Create and delete Accounts from data file', async ({ page }) => {
        await pm.initialize('Service')
        await dataDrivenTest.runTestFromData('./data/accounts.csv', 'Account');
    });

    test('Create and delete Contacts from data file', async ({ page }) => {
        await dataDrivenTest.runTestFromData('./data/contacts.csv', 'Contact');
    });

    test('Create and delete Cases from data file', async ({ page }) => {
        await pm.initialize('Service')
        await dataDrivenTest.runTestFromData('./data/cases.csv', 'Case');
    });

    test('Create and delete Opportunities from data file', async ({ page }) => {
        await dataDrivenTest.runTestFromData('./data/opportunities.csv', 'Opportunity');
    });

    test('Create and delete Leads from data file', async ({ page }) => {
        await dataDrivenTest.runTestFromData('./data/leads.xlsx', 'Lead');
    });
});
