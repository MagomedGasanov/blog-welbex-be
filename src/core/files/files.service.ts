import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

import { v4 as uuidV4 } from 'uuid';

type Dest = 'images' | 'video';

@Injectable()
export class FilesService {
    async createFile(
        file: Express.Multer.File,
        extension: string,
        dest: Dest,
    ): Promise<string> {
        try {
            const fileKey = uuidV4() + extension;
            const filePath = path.resolve(__dirname, '..', `static/${dest}`);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.join(filePath, fileKey), file.buffer);
            return fileKey;
        } catch (e) {
            console.log(e);
            throw new HttpException(
                'File uploading error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getFile(fileKey: string, dest: Dest) {
        try {
            const filePath = path.resolve(__dirname, '..', `static/${dest}`);
            const data = await fsPromises.readFile(
                path.join(filePath, fileKey),
            );
            return data;
        } catch (e) {
            console.log(e);
            throw new HttpException(
                'File uploading error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
