import { CustomError } from "../utils/CustomError";

const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: function(req: Request, file: any, cb: any) {
        cb(null, 'uploads');
    },
    filename: function (req: Request, file: any, cb: any) {
        const ext = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + ext;
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const fileFilter = (req: Request, file: any, cb: any) => {
    const imageType = file.mimetype.split('/')[0];
    if (imageType === 'image') {
        cb(null, true);
    } else {
        cb(new CustomError(400, 'File must be an image'), false);
    }
}

const upload = multer({ 
    storage: diskStorage,
    fileFilter
});

export {
    upload
}