import { CommentResponse } from "./commentTypes";
import { LabelResponse } from "./labelTypes";

export interface TaskResponse {
  id: string;
  shortId: number;
  name: string;
  description: string;
  due: string | null;
  card_id: {
    id: string;
    shortId: number;
    name: string;
  };
  labels?: LabelResponse[];
  comments?: CommentResponse[];
}

export interface TaskValues {
  name: string;
  card_id: string;
}
