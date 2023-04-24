import { Router } from "express";

const router = Router();

router.route("/").post((req, res, next) => {
  next();
});

export default router;
