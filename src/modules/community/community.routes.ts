import express from "express";
import auth from "../../middlewares/auth";
import { CommunityController } from "./community.controller";

const router = express.Router();

/**
 * @swagger
 * /community/posts:
 *   post:
 *     tags:
 *       - Community
 *     summary: Create a new community post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               post_content:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       403:
 *         description: Unauthorized
 */
router.post(
  "/posts",
  auth("CUSTOMER", "VENDOR", "ADMIN"),
  CommunityController.createPost,
);

/**
 * @swagger
 * /community/posts:
 *   get:
 *     tags:
 *       - Community
 *     summary: Get all community forum posts
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/posts", CommunityController.fetchPosts);

/**
 * @swagger
 * /community/comment:
 *   post:
 *     tags:
 *       - Community
 *     summary: Add a comment to a post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_id:
 *                 type: string
 *               comment_text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       403:
 *         description: Unauthorized
 */
router.post(
  "/comment",
  auth("CUSTOMER", "VENDOR", "ADMIN"),
  CommunityController.postComment,
);

export const CommunityRoutes = router;
