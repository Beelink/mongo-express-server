// utils
import express from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";

// controllers
import { signIn, signUp, getMe } from "../controllers/user.controller";

const router = express.Router();

/**
 * @swagger
 * /user/sign-in:
 *  post:
 *    tags:
 *      - User
 *    summary: Sign in user
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *        required:
 *          - email
 *          - password
 *    responses:
 *      '200':
 *        description: Signed in successfully
 *      '400':
 *        description: Wrong password provided
 *      '404':
 *        description: User not found
 */
router.post("/sign-in", signIn);

/**
 * @swagger
 * /user/sign-up:
 *  post:
 *    tags:
 *      - User
 *    summary: Sign up user
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            name:
 *              type: string
 *            password:
 *              type: string
 *        required:
 *          - email
 *          - name
 *          - password
 *    responses:
 *      '200':
 *        description: Signed up successfully
 *      '400':
 *        description: User already exists
 */
router.post("/sign-up", signUp);

/**
 * @swagger
 * /user/me:
 *  get:
 *    tags:
 *      - User
 *    summary: Get user profile
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Profile received successfully
 *      '404':
 *        description: User not found
 */
router.get("/me", AuthMiddleware, getMe);

export default router;
