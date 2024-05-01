import multer, { diskStorage } from 'multer';

export const StorageConfig = multer.diskStorage({
     destination: `upload/img`,
     filename(req, file, callback) {
          callback(null, Date.now() + '-' + file.originalname);
     },
});

export const upload = multer({ storage: StorageConfig });
