import { Router } from "express";
import { uploadImage, uploadVideo } from "../controller/upload.controller";
import { upload } from "../utils/multerUpload";
import { authVerification } from "../middleware/auth.middleware";

const router = Router();


router.route('/upload-image').post(upload.single('image'), authVerification, uploadImage);
router.route('/upload-video').post(upload.single('video'), authVerification, uploadVideo);

export default router;
