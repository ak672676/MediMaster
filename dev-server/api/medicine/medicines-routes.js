import express from "express";
import * as controller from "./medicines-controller";
const router =express.Router();

import  * as auth from "../../services/auth-service";

router.post("/medicine",auth.requireLogin,controller.create);
router.get("/medicine",auth.requireLogin,controller.index);
router.get("/medicine/:id",auth.requireLogin,controller.show);
router.get("/medicine/search/:keyword",auth.requireLogin,controller.search);
router.put("/medicine",auth.requireLogin,controller.update);
router.delete("/medicine/:id",auth.requireLogin,controller.remove);


export default router;
