import { Router } from "express";

const router = Router();

// router
router.route("/").post((req, res, _next) => {
  console.log("receiving event for comment", req.body.type);
  return res.send("OK");
});

export default router;
