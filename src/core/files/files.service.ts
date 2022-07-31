import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class FilesService {
    async createFile(
        file: Express.Multer.File,
        extension: string,
        dest: 'images' | 'video',
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
}
