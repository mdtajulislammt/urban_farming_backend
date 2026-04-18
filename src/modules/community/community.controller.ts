import { Request, Response } from 'express';
import { CommunityService } from './community.service';
import sendResponse from '../../utils/sendResponse';

const createPost = async (req: Request, res: Response) => {
    const result = await CommunityService.createPost(req.user.userId, req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Post created successfully",
        data: result
    });
};

const fetchPosts = async (req: Request, res: Response) => {
    const result = await CommunityService.getAllPosts();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        data: result
    });
};

const postComment = async (req: Request, res: Response) => {
    const result = await CommunityService.addComment(req.user.userId, req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Comment added",
        data: result
    });
};

export const CommunityController = { createPost, fetchPosts, postComment };