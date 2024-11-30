import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import * as fs from 'node:fs/promises';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';


function getStaticFolderPath(folderName?: string) {
  const staticFolderPath = path.resolve(__dirname, '../static');
  
  return staticFolderPath ? `${staticFolderPath}/${folderName}` : staticFolderPath
}

function getFileUrl(fileName: string, folderName?: string) {
  return `${folderName || ''}/${fileName}`
}

const generateFileName = (file: UploadedFile) => {
  const fileExtension = file.name.split('.')[1];
  const generatedFileName = uuidv4() + `.${fileExtension}`;

  return generatedFileName;
};

const resolvePath = (fileName: string) => {
  return path.resolve(__dirname, '..', 'static', `${fileName}`);
};

const unlinkFile = async (removeFileName: string, folderName?: string): Promise<void> => {
  const filePath = `${folderName ? `${folderName}/` : ''}` + resolvePath(removeFileName);

  try {
    await fs.stat(filePath);
    await fs.unlink(filePath);

    console.log(`${removeFileName} was successfully removed`);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject();
  }

};

export async function saveFiles<
  T extends UploadedFile | UploadedFile[],
  R = T extends UploadedFile ? string : string[],
>(
  files: T,
  folderName?: string,
): Promise<R> {
  const folderPath = getStaticFolderPath(folderName);

  if (folderName) {
    try {
      if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (Array.isArray(files)) {
    const fileUrls: string[] = [];
  
    files.forEach(file => {
      const generatedName = generateFileName(file);
      const fileUrl = getFileUrl(generatedName, folderName);
      fileUrls.push(fileUrl);
      file.mv(resolvePath(`${folderPath}/${generatedName}`));
    })

    return fileUrls as R;
  }

  const generatedName = generateFileName(files);
  const fileUrl = getFileUrl(generatedName, folderName);

  files.mv(resolvePath(`${folderPath}/${generatedName}`));
  
  return fileUrl as R;
  
};

export async function deleteFiles<T extends string | string[]>(
  files: T,
  folderName?: string
): Promise<void | void[]> {

  if (Array.isArray(files)) {
    try {
      return await Promise.all(files.map(async (file) => {
        await unlinkFile(file);
      }));
    } catch (err) {
      return console.log(err);
    }
  }

  return await unlinkFile(files, folderName);
};

export async function updateFiles<
  T extends UploadedFile | UploadedFile[],
>(
  newFiles: T,
  oldFiles: string | string[],
  folderName?: string,
): Promise<string | string[]> {
  // delete old files
  await deleteFiles(oldFiles, folderName);

  // save new files
  
  const newFileNames = await saveFiles(newFiles, folderName);

  return newFileNames;
};