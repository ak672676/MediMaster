import express from "express";
import * as controller from "./user-controller";
import  * as auth from "../../services/auth-service";

const router =express.Router();

router.get("/user",controller.index);
router.get("/user/:id",controller.getShopById);
router.get("/user/search/:keyword",auth.requireLogin,controller.search);
router.put("/user/ledger",auth.requireLogin,controller.updateLedger);




export default router;
