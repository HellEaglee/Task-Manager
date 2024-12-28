import { User } from "./commonTypes";

export interface CommentResponse {
  id: string;
  shortId: number;
  description: string;
  timestamp: string;
  user_id: User;
}

export interface CommentValues {
  description: string;
  user_id: string;
  task_id: string;
}
