import React from "react";

// Post 컴포넌트
const Post = ({ title, content, author, createdAt, updatedAt }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>
        <strong>작성자:</strong> {author}
      </p>
      <p>
        <strong>작성일:</strong> {new Date(createdAt).toLocaleString()}
      </p>
      <p>
        <strong>업데이트일:</strong> {new Date(updatedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default Post;
