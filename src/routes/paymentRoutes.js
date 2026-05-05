import express from "express";
import * as paymentController from "../controllers/payment.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/create-intent", authenticate, paymentController.createPaymentIntent);
router.post("/test-confirm", authenticate, paymentController.testConfirmPayment);
router.post("/confirm", authenticate, paymentController.confirmPayment);
router.get("/status/:paymentIntentId", authenticate, paymentController.getPaymentStatus);

export default router;