import Router from "express"
import { imageTransformation, videoTransformation } from "../controller/fileModify.controller";
import { authVerification } from "../middleware/auth.middleware";

const router = Router();

router.route("/image-transformation",).post(authVerification,imageTransformation);
router.route("/video-transformation",).post(authVerification,videoTransformation);


export default router;