import { Request, Router } from "express";
import { randomBytes } from "crypto";
import axios, { AxiosError, AxiosResponse } from "axios";
import { PORT_EVENT_BUS } from "../constants";
import { Post, ReqEventPostCreated } from "../interfaces";

// init
const router = Router();

export default router;
