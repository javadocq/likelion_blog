import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from "./Post.jsx";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");
    const [newPostAuthor, setNewPostAuthor] = useState("");

    // 게시물 목록을 API로부터 가져오기
    useEffect(() => {
        const fetchGet = async() => {
            try {
                const response = await axios.get('http://localhost:8000/posts/');
                setPosts(response.data.results);
                console.log(response.data.results);
            } catch (e){
                console.log(e);
            }
        }
        fetchGet();
    }, []);

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
    const addNewPost = () => {
        if (newPostTitle && newPostContent && newPostAuthor) {
            const newPost = {
                title: newPostTitle,
                content: newPostContent,
                author: newPostAuthor,
            };

            axios.post('http://127.0.0.1:8000/posts/', newPost)  // API URL
                .then((response) => {
                    setPosts([...posts, response.data]);  // 새 포스트 추가
                    setNewPostTitle("");
                    setNewPostContent("");
                    setNewPostAuthor("");
                })
                .catch((error) => {
                    console.error("Error adding post:", error);
                });
        }
    };

    useEffect(() => {
        if (newPostTitle && newPostContent && newPostAuthor) {
            const newPost = {
                title: newPostTitle,
                content: newPostContent,
                author: newPostAuthor,
            };
            const fetchPost = async() => {
                try {
                    const response = await axios.post('http://localhost:8000/posts/', newPost);
                    console.log(response.data);
                } catch (e){
                    console.log(e);
                }
            }
            fetchPost();
        }
    },[]);

    return (
        <div>
            <h1>Blog</h1>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    title={post.title}
                    content={post.content}
                    author={post.author}
                    createdAt={post.created_at}
                    updatedAt={post.updated_at}
                />
            ))}
            <h2>새 포스트 추가</h2>
            <input
                type="text"
                placeholder="제목"
                value={newPostTitle}
                onChange={handleTitleChange}
            />
            <textarea
                placeholder="내용"
                value={newPostContent}
                onChange={handleContentChange}
            ></textarea>
            <input
                type="text"
                placeholder="작성자"
                value={newPostAuthor}
                onChange={handleAuthorChange}
            />
            <button onClick={addNewPost}>포스트 추가</button>
        </div>
    );
};

export default Blog;
