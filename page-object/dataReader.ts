// dataReader.ts
import * as fs from 'fs';
import * as path from 'path';
import * as xlsx from 'xlsx';
import csvParser from 'csv-parser';

export interface EntityData {
    [key: string]: string;
}

export class DataReader {
    static readExcel(filePath: string): EntityData[] {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        return xlsx.utils.sheet_to_json(sheet);
    }

    static readCsv(filePath: string): Promise<EntityData[]> {
        return new Promise((resolve, reject) => {
            const results: EntityData[] = [];
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    }
}
