import React from "react";

// Post 컴포넌트
const Post = ({
  id,
  title,
  content,
  author,
  createdAt,
  updatedAt,
  handleDelete,
}) => {
  return (
    <div
      style={{
        border: "1px solid white",
        padding: "10px",
        backgroundColor: "#474343",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>제목 : {title}</h2>
      <p>내용 : {content}</p>
      <p>
        <strong>작성자:</strong> {author}
      </p>
      <p>
        <strong>작성일:</strong> {new Date(createdAt).toLocaleString()}
      </p>
      <p>
        <strong>업데이트일:</strong> {new Date(updatedAt).toLocaleString()}
      </p>
      <button
        onClick={() => handleDelete(id)}
        style={{
          backgroundColor: "#292725",
          color: "white",
          cursor: "pointer",
          height: "30px",
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default Post;
