import { Router } from "express";
// local
import eventsRoutes from "./events";
import postsRoutes from "./posts";

const router = Router();

router.use("/", eventsRoutes, postsRoutes);

export default router;
