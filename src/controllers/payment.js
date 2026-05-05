import Stripe from "stripe";
import Enrollment from "../database/model/enrollment.js";
import Course from "../database/model/course.js";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const stripe = getStripe();
    const { courseId } = req.body;
    const userId = req.user.id;

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const existingEnrollment = await Enrollment.findOne({
      where: { userId, courseId },
    });
    if (existingEnrollment && existingEnrollment.isPaid) {
      return res.status(400).json({ error: "Already paid for this course" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(course.price * 100),
      currency: "usd",
      metadata: {
        courseId: String(courseId),
        userId: String(userId),
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: course.price,
      courseName: course.title,
    });
  } catch (error) {
    console.error("Payment error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const testConfirmPayment = async (req, res) => {
  try {
    const stripe = getStripe();
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: "pm_card_visa",
      return_url: "http://localhost:5000",
    });

    res.json({
      status: paymentIntent.status,
      id: paymentIntent.id,
    });
  } catch (error) {
    console.error("Test confirm error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const stripe = getStripe();
    const { paymentIntentId, courseId } = req.body;
    const userId = req.user.id;

    // Only retrieve — never confirm again
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    console.log("Payment status:", paymentIntent.status);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ 
        error: `Payment not completed. Status: ${paymentIntent.status}` 
      });
    }

    let enrollment = await Enrollment.findOne({ 
      where: { userId, courseId: Number(courseId) } 
    });

    if (enrollment) {
      await enrollment.update({ isPaid: true, status: "active" });
    } else {
      enrollment = await Enrollment.create({
        userId,
        courseId: Number(courseId),
        isPaid: true,
        status: "active",
        currentStage: "1",
      });
    }

    res.json({
      message: "Payment confirmed! You now have access to the course ✅",
      enrollment,
    });
  } catch (error) {
    console.error("Confirm payment error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const stripe = getStripe();
    const { paymentIntentId } = req.params;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    console.error("Payment status error:", error.message);
    res.status(500).json({ error: error.message });
  }
};