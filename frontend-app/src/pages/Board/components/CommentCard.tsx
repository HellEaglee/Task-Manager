import React from "react";
import { CommentResponse } from "../../../types/commentTypes";

interface CommentCardProps {
  comment: CommentResponse | null;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const firstLetter = comment?.user_id.name.charAt(0);
  return (
    <div>
      <div className="flex gap-2">
        <div className="flex justify-center items-center size-6 bg-primary cursor-pointer rounded-full">
          <p className="text-background text-base font-bold">{firstLetter}</p>
        </div>
        <p className="text-graysilver text-sm font-normal">
          {comment?.user_id.name}
        </p>
      </div>
      <div className="pl-8">
        <p className="text-graywhite text-base font-normal">
          {comment?.description}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
