import React, { useState } from "react";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  const [visibleReply, setVisibleReply] = useState("");
  if (comments === undefined) return;

  return comments.map((comment) => (
    <div key={comment.id} className="my-2 max-w-[85vw]">
      <Comment
        data={
          comment.snippet.topLevelComment !== undefined
            ? comment.snippet.topLevelComment.snippet
            : comment.snippet
        }
        replyCount={comment?.snippet?.totalReplyCount}
        id={comment.id}
        isVisible={visibleReply === comment.id}
        setVisibleReply={setVisibleReply}
      />
      {visibleReply === comment.id && (
        <div className="pl-14 ">
          <CommentList comments={comment?.replies?.comments} />
        </div>
      )}
    </div>
  ));
};

export default CommentList;
