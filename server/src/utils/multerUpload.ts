import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/public/uploads')
  },
  filename: function (req, file, cb) {
    const originalName = path.parse(file.originalname).name;
    const extension = path.extname(file.originalname);

    const date = new Date();
    const name = originalName + (date.toLocaleDateString()).replaceAll('/','_')+ "T" +(date.toLocaleTimeString()).replaceAll(':','_').replace(" ","") + extension;

    cb(null, name)
  }
})

export const upload = multer({ storage: storage })