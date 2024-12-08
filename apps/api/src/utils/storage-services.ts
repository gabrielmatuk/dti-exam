import * as fs from 'fs';
import * as path from 'path';

export class StorageService {
  private storagePath = path.resolve(__dirname, '../../uploads');

  constructor() {
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath, { recursive: true });
    }
  }

  async uploadFile(fileName: string, fileBuffer: Buffer): Promise<string> {
    const filePath = path.join(this.storagePath, fileName);
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, fileBuffer, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(`/uploads/${fileName}`);
        }
      });
    });
  }
}