import { CommentDataType } from "./commentDataType";
export interface PostDataType {
  nickname: string;
  boardId: number;
  profilepic: string;
  content: string;
  hashtagNames: string[];
  roadName: string;
  createAt: Date;
  updateAt: Date;
  commentList: CommentDataType[];
  imageUrls: string[];
  shopName: string;
}
