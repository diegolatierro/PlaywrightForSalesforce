import { PageManager } from './pageManager';
import { Page } from '@playwright/test';
import { DataReader, EntityData } from './dataReader';

export class DataDrivenTest {
    private page: Page;
    public pm: PageManager; 

    constructor(page: Page) {
        this.page = page;
        this.pm = new PageManager(page);
    }

    async runTestFromData(filePath: string, entityType: string) {
        let data: EntityData[];

        if (filePath.endsWith('.xlsx')) {
            data = DataReader.readExcel(filePath);
        } else if (filePath.endsWith('.csv')) {
            data = await DataReader.readCsv(filePath);
        } else {
            throw new Error('Unsupported file format');
        }

        for (const record of data) {
            switch (entityType) {
                case 'Account':
                    await this.pm.account().createBasic({
                        'Name': record['Name'],
                        'Phone': record['Phone'],
                        'Website': record['Website']
                    });
                    await this.pm.account().delete(record['Name']);
                    break;
                case 'Contact':
                    await this.pm.contact().createBasic({ 
                        'First Name': record['FirstName'], 
                        'Last Name': record['LastName'], 
                        'Email': record['Email'] 
                    });
                    await this.pm.contact().delete(record['LastName']);
                    break;
                case 'Case':
                    await this.pm.case().createBasic({
                        'Subject': record['Subject'], 
                        'Status': record['Status'], 
                        'Case Origin': record['CaseOrigin']
                    });
                    await this.pm.case().delete(record['Subject']);
                    break;
                case 'Opportunity':
                    await this.pm.opportunity().createBasic({
                        'Opportunity': record['Opportunity'], 
                        'CloseDate': record['CloseDate'], 
                        'Stage': record['Stage']
                    });
                    await this.pm.opportunity().delete(record['Opportunity']);
                    break;
                case 'Lead':
                    await this.pm.lead().createBasic({
                        'First Name': record['FirstName'], 
                        'Last Name': record['LastName'], 
                        'Company': record['Company']
                    });
                    await this.pm.lead().delete(record['LastName']);
                    break;
                default:
                    throw new Error('Unsupported entity type');
            }
        }
    }
}
