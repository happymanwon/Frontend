import { CommentDataType } from "./commentDataType";
export interface PostDataType {
  boardId: number;
  memberId: number;
  profilepic: string;
  boardTitle: string;
  content: string;
  tag: string[];
  createdAt: string;
  updatedAt: string;
  nickname: string;
  comments: CommentDataType;
}
