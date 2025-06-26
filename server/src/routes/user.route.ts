import { Router } from "express";
import { CreateUser, getCurrentUser } from "../controller/user.controller";

const router = Router();

router.route('/sign-in').post(CreateUser);
router.route('/current-user').get(getCurrentUser);

export default router;