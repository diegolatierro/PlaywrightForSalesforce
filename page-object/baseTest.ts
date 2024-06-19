import { test as base, Page } from '@playwright/test';
import { PageManager } from './pageManager';

type MyFixtures = {
    pageManager: PageManager;
};

export const test = base.extend<MyFixtures>({
    pageManager: async ({ page }, use) => {
        const pageManager = new PageManager(page);
        await use(pageManager);
    },
});

export { expect } from '@playwright/test';
