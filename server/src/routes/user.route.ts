import { Router } from "express";
import { CreateUser } from "../controller/user.controller";

const router = Router();

router.route('/sign-in').post(CreateUser);

export default router;