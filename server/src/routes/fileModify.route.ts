import Router from "express"
import { imageTransformation, removeBg, videoTransformation } from "../controller/fileModify.controller";
import { authVerification } from "../middleware/auth.middleware";
import { upload } from "../utils/multerUpload";

const router = Router();

router.route("/image-transformation",).post(authVerification,imageTransformation);
router.route("/video-transformation",).post(authVerification,videoTransformation);
router.route('/remove-bg').post(upload.single('image'), authVerification, removeBg);



export default router;