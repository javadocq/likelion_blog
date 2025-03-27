import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post.jsx";

const Blog = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "React와 Next.js 비교",
      content: "React와 Next.js는 서로 다르면서도 비슷한 프레임워크입니다.",
      author: "에이미",
      created_at: "2024-02-09T12:00:00Z",
      updated_at: "2024-02-09T12:30:00Z",
    },
    {
      id: 2,
      title: "Django로 API 만들기",
      content: "Django Rest Framework를 활용하면 API 개발이 쉬워집니다.",
      author: "한양대",
      created_at: "2024-02-08T10:00:00Z",
      updated_at: "2024-02-08T11:00:00Z",
    },
    {
      id: 3,
      title: "AWS 배포 가이드",
      content: "EC2, S3, RDS를 활용하여 프로젝트를 배포하는 방법을 알아봅시다.",
      author: "멋쟁이사자처럼",
      created_at: "2024-02-07T15:00:00Z",
      updated_at: "2024-02-07T16:00:00Z",
    },
  ]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostAuthor, setNewPostAuthor] = useState("");

  // 게시물 목록을 API로부터 가져오기
  useEffect(() => {
    fetchGet();
  }, []);

  const fetchGet = async () => {
    try {
      const response = await axios.get("http://localhost:8000/posts/");
      setPosts(response.data.results);
      console.log(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  // 입력 값 처리
  const handleTitleChange = (e) => {
    setNewPostTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setNewPostContent(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setNewPostAuthor(e.target.value);
  };

  // 새 포스트 추가
  const addNewPost = async () => {
    if (newPostTitle && newPostContent && newPostAuthor) {
      const newPost = {
        title: newPostTitle,
        content: newPostContent,
        author: newPostAuthor,
      };
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/posts/",
          newPost
        ); // API URL
        setPosts([...posts, response.data]); // 새 포스트 추가
        setNewPostTitle("");
        setNewPostContent("");
        setNewPostAuthor("");
        console.log(response.data);
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };
  const handleDelete = (postId) => {
    const fetchDelete = async () => {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/posts/${postId}/`
        );
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchDelete();
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <h1
          style={{
            fontSize: "55px",
            margin: "0px",
            padding: "0px",
            marginTop: "50px",
          }}
        >
          Blog 포스트 작성하기
        </h1>
        <div
          style={{
            border: "1px solid white",
            padding: "10px",
            backgroundColor: "#474343",
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            value={newPostTitle}
            onChange={handleTitleChange}
            style={{ width: "200px", height: "30px" }}
          />
          <textarea
            placeholder="내용을 입력해주세요."
            value={newPostContent}
            onChange={handleContentChange}
            style={{ marginTop: "20px", width: "500px", height: "150px" }}
          ></textarea>
          <input
            type="text"
            placeholder="작성자를 입력해주세요."
            value={newPostAuthor}
            onChange={handleAuthorChange}
            style={{ marginTop: "20px", width: "200px", height: "30px" }}
          />
          <button
            onClick={addNewPost}
            style={{
              marginTop: "20px",
              width: "500px",
              height: "50px",
              backgroundColor: "#292725",
              color: "white",
              cursor: "pointer",
            }}
          >
            포스트 추가
          </button>
        </div>
      </div>
      <div
        style={{
          marginLeft: "200px",
          marginTop: "50px",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          paddingBottom: "50px",
        }}
      >
        {posts.map((post) => (
          <Post
            key={post?.id}
            id={post?.id}
            title={post?.title}
            content={post?.content}
            author={post?.author}
            createdAt={post?.created_at}
            updatedAt={post?.updated_at}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
