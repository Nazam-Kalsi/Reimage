import Router from "express"
import { imageTransformation } from "../controller/fileModify.controller";
import { authVerification } from "../middleware/auth.middleware";

const router = Router();

router.route("/image-transformation",).post(authVerification,imageTransformation);


export default router;