import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: auto;
  border: 1px solid #ddd;
  padding: 30px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const AddButton = styled(Link)`
  padding: 15px 20px;
  background-color: #2b2144;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #483d69;
  }
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: -20px;
`;

const PostListItem = styled.li`
  margin: 15px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const PostInfo = styled.div`
display: flex;
align-items: center;
margin-left: auto;
font-size: 10px;
`;

const PostTitle = styled.strong`
  font-size: 18px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  img {
    margin-left: 5px;
    width: 20px;
    height: 20px;
  }
`;

const LikeCount = styled.span`
  margin-right: 5px;
`;

const CommentCount = styled.span`
  margin-right: 5px;
`;

const Author = styled.span`
  color: #555;
  margin-right: 10px;
`;

const Dates = styled.span`
  color: #555;
`;

const Pagination = styled.div`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 20px 0;
  justify-content: center;
  align-items: center;

  button {
    margin-right: 5px;
    padding: 7px 12px;
    background-color: #fff;
    color: #2b2144;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
`;

const ArrowButton = styled.button`
  background-color: #ffffff;
  padding: 7px 12px;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  transition: background-color 0.3s ease;
`;


const Board = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://exchangers.site/api/exchangers/v1/board');
        console.log('Response:', response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <BoardContainer>
      <HeaderContainer>
        <h2>Board</h2>
        <AddButton to="/write-post">Add Post</AddButton>
      </HeaderContainer>

      <PostList>
        {currentPosts.map((post) => (
          <Link key={post._id} to={{ pathname: `/board/${post._id}`, state: { post } }}>
            <PostListItem>
              <PostTitle>{post.title} {post.imageUrl && '🖼️'} </PostTitle>
              <PostInfo>
                <LikeCount>💜 {post.likes}</LikeCount>
                <CommentCount>🗒️ {post.comments}</CommentCount>
                <Author>{post.author.nickname}</Author>
                <Dates>{new Date(post.createdAt).toLocaleString()}</Dates>
              </PostInfo>
            </PostListItem>
          </Link>
        ))}
      </PostList>

      <Pagination>
        <ArrowButton onClick={() => paginate(1)}>{'◀'}</ArrowButton>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>{index + 1}</button>
        ))}
        <ArrowButton onClick={() => paginate(totalPages)}>{'▶'}</ArrowButton>
      </Pagination>
    </BoardContainer>
  );
};

export default Board;