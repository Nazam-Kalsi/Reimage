import Router from "express"
import { getUploadedImages } from "../controller/dashboard.controller";

const router = Router();

router.route('/get-images-data').get(getUploadedImages);

export default router;