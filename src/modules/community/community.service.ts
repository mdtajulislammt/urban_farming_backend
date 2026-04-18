import prisma from "../../config/prisma";

const createPost = async (userId: string, payload: any) => {
  return await prisma.community_post.create({
    data: {
      user_id: userId,
      post_content: payload.post_content,
      title: payload.title,
      image_url: payload.image_url,
    },
  });
};

const getAllPosts = async () => {
  return await prisma.community_post.findMany({
    include: {
      user: { select: { name: true, role: true } },
      _count: { select: { comments: true } },
    },
    orderBy: { post_date: "desc" },
  });
};

const addComment = async (userId: string, payload: any) => {
  return await prisma.comment.create({
    data: {
      user_id: userId,
      post_id: payload.post_id,
      comment_text: payload.comment_text,
    },
  });
};

export const CommunityService = {
  createPost,
  getAllPosts,
  addComment,
};
