import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { userInfo } from '../../recoil/recoil';
import { useRecoilValue } from 'recoil';

const ViewPostPageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 100px;
`;

const PostContentWrapper = styled.div`
  position: relative;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 8px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
`;

const Dates = styled.span`
  font-size: 14px;
  color: #888;
`;

const Content = styled.div`
  font-size: 16px;
  margin-bottom: 16px;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LikeCount = styled.span`
  cursor: pointer;
  margin-left: 8px;
  font-size: 16px;
  color: #888;
`;

const CommentCount = styled.span`
  margin-left: 8px;
  font-size: 16px;
  color: #888;
`;

const CommentSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const CommentButton = styled.button`
  color: #fff;
  padding: 7px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-left: 8px;
  border-radius: 8px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 16px;
`;

const CommentItem = styled.li`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 6px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
`;

const DeleteFixPostButton = styled.button`
  color: #fff;
  padding: 7px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Image = styled.img`
  max-width: 50%;
  height: auto;
  border-radius: 8px;
  margin-top: 16px;
`;

const CommentText = styled.span`
  font-size: 16px;
`;

const JoinUsMessage = styled.p`
  font-size: 16px;
  color: #888;
  text-align: center;
`;

const LikeCommentButton = styled.button`
  color: #888;
  cursor: pointer;
  width: 30px;
  border: none;
  background-color: transparent;
  border-radius: 4px;
`;

const DeleteCommentButton = styled.button`
  color: #000;
  cursor: pointer;
  width: 30px;
  border: 0px;
  border-radius: 4px;
  text-align: center;
`;

const EditCommentButton = styled.button`
  color: #000;
  cursor: pointer;
  width: 30px;
  border: 0px;
  border-radius: 4px;
  text-align: center;
`;

const SaveButton = styled.button`
  color: #fff;
  background-color: #4caf50;
  padding: 5px;
  width: 40px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 20px;
`;

const CancelButton = styled.button`
  color: #fff;
  background-color: #f44336;
  padding: 5px;
  width: 40px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 20px;
`;

const ViewPostPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    email: '',
    nickname: '',
    profile: '',
  });
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const { id: postId } = useParams();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          'https://exchangers.site/api/exchangers/v1/user/me',
        );

        if (response.status === 200) {
          const { email, nickname, profile } = response.data;
          setUser({ email, nickname, profile });
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const [post, setPost] = useState({
    _id: '',
    title: '',
    content: '',
    author: { _id: '', nickname: '' },
    imageUrl: '',
    comments: [],
    likes: 0,
    createdAt: '',
    __v: 0,
    liked: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://exchangers.site/api/exchangers/v1/board/${postId}`,
        );
        setPost(response.data);
        setIsLiked(response.data.liked);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchData();
  }, [postId]);

  const isPostOwner = isLoggedIn && post.author.nickname === user.nickname;

  const handleDeletePost = async () => {
    try {
      await axios.delete(
        `https://exchangers.site/api/exchangers/v1/board/${postId}`,
      );
      alert('Post Deleted');
      navigate('/board');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  const handleFixPost = () => {
    navigate(`/fix-post/${postId}`);
  };

  const handleLike = async () => {
    try {
      await axios.put(
        `https://exchangers.site/api/exchangers/v1/board/${postId}/like`,
      );
      setPost((prevPost) => ({
        ...prevPost,
        liked: !prevPost.liked,
        likes: prevPost.likes + (prevPost.liked ? -1 : 1),
      }));
      setIsLiked((prevIsLiked) => !prevIsLiked);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async () => {
    try {
      const formData = new FormData();
      formData.append('content', newComment);

      const response = await axios.post(
        `https://exchangers.site/api/exchangers/v1/board/${postId}/comment`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      window.location.reload();

      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, response.data],
      }));

      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = async (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleSaveEditComment = async (commentId, newText) => {
    try {
      await axios.put(
        `https://exchangers.site/api/exchangers/v1/board/${postId}/comment/${commentId}`,
        {
          content: newText,
        },
      );

      setPost((prevPost) => {
        const updatedComments = prevPost.comments.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: newText }
            : comment,
        );
        return { ...prevPost, comments: updatedComments };
      });

      setEditingCommentId(null);
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
  };

  const handleDeleteComment = async (commentId, index) => {
    try {
      await axios.delete(
        `https://exchangers.site/api/exchangers/v1/board/${postId}/comment/${commentId}`,
      );

      setPost((prevPost) => {
        const updatedComments = prevPost.comments.filter(
          (comment) => comment._id !== commentId,
        );
        return { ...prevPost, comments: updatedComments };
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      await axios.put(
        `https://exchangers.site/api/exchangers/v1/board/${postId}/comment/${commentId}/like`,
      );

      setPost((prevPost) => {
        const updatedComments = prevPost.comments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                liked: !comment.liked,
                likes: comment.likes + (comment.liked ? -1 : 1),
              }
            : comment,
        );
        return { ...prevPost, comments: updatedComments };
      });
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <ViewPostPageWrapper>
      <PostContentWrapper>
        <Title>
          {post.title}
          <Dates>{new Date(post.createdAt).toLocaleString()}</Dates>
        </Title>
        <Content>{post.content}</Content>
        {post.imageUrl && <Image src={post.imageUrl} alt="Post Image" />}

        <MetaInfo>
          <LikeCount onClick={handleLike}>💜{post.likes}</LikeCount>
          <CommentCount>🗒️{post.comments.length} </CommentCount>
        </MetaInfo>
        <MetaInfo>
          {isLoggedIn && isPostOwner && (
            <>
              <DeleteFixPostButton onClick={handleFixPost}>
                {' '}
                🛠️
              </DeleteFixPostButton>
              <DeleteFixPostButton onClick={handleDeletePost}>
                {' '}
                🗑️
              </DeleteFixPostButton>
            </>
          )}
        </MetaInfo>
      </PostContentWrapper>

      {isLoggedIn ? (
        <>
          <CommentSection>
            <CommentInput
              type="text"
              placeholder="Comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <CommentButton onClick={handleComment}>✏️</CommentButton>
          </CommentSection>
          <CommentList>
            {post.comments.map((comment, index) => (
              <CommentItem key={comment._id || index}>
                {editingCommentId === comment._id ? (
                  <>
                    <CommentInput
                      type="text"
                      value={comment.content}
                      onChange={(e) =>
                        setPost((prevPost) => ({
                          ...prevPost,
                          comments: prevPost.comments.map((c) =>
                            c._id === comment._id
                              ? { ...c, content: e.target.value }
                              : c,
                          ),
                        }))
                      }
                    />
                    <div>
                      <SaveButton
                        onClick={() =>
                          handleSaveEditComment(comment._id, comment.content)
                        }
                      >
                        🫙
                      </SaveButton>
                      <CancelButton onClick={handleCancelEditComment}>
                        ✖️
                      </CancelButton>
                    </div>
                  </>
                ) : (
                  <>
                    <CommentText>
                      <strong>{comment.author?.nickname}</strong>:{' '}
                      {comment.content}
                    </CommentText>
                    <div>
                      <LikeCommentButton
                        onClick={() => handleLikeComment(comment._id)}
                      >
                        👍
                      </LikeCommentButton>
                      <span>{comment.likes}</span>
                      {isLoggedIn &&
                        comment.author?.nickname === user.nickname && (
                          <>
                            <EditCommentButton
                              onClick={() => handleEditComment(comment._id)}
                            >
                              ✏️
                            </EditCommentButton>
                            <DeleteCommentButton
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              ❌
                            </DeleteCommentButton>
                          </>
                        )}
                    </div>
                  </>
                )}
              </CommentItem>
            ))}
          </CommentList>
        </>
      ) : (
        <JoinUsMessage>If you want to see comments, join us!</JoinUsMessage>
      )}
    </ViewPostPageWrapper>
  );
};
export default ViewPostPage;
