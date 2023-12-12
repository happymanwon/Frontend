import { CommentDataType } from "./commentDataType";
export interface PostDataType {
  nickname: string;
  boardId: number;
  profilepic: string;
  content: string;
  hashtagNames: string[];
  createdAt: string;
  updatedAt: string;
  commentList: CommentDataType[];
  imageUrls: string[];
}
