import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';

const Container = styled.div`
  max-width: 800px;
  height: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.input`
  padding: 8px;
  margin-bottom: 6px;
  border: 1px solid #ddd;
  border-radius: 3px;
  height: 30px;
  resize: none;
`;

const Content = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 3px;
  height: 300px;
  resize: none;
`;

const FileInputContainer = styled.label`
  position: relative;
  display: inline-block;
  background-image: url("/image-add-button_icon-icons.com_71462.png");
  background-size: 30px;
  background-position: center;
  background-repeat: no-repeat;
  height: 35px;
  width: 50px;
  cursor: pointer;
  margin-bottom: 16px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 3px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: #2b2144;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #3f3063;
  }
`;

const FixPostPage = () => {
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const [existingPost, setExistingPost] = useState({ title: '', content: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`https://exchangers.site/api/exchangers/v1/board/${postId}`);
        const postToFix = response.data;
        setExistingPost({
          title: postToFix.title || '',
          content: postToFix.content || '',
          image: null,
        });
        setImagePreview(postToFix.imageUrl);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };
    fetchPostData();
  }, [postId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExistingPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setExistingPost((prevPost) => ({ ...prevPost, image: file }));
  };

  const handleFixPost = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://exchangers.site/api/exchangers/v1/board/${postId}`, existingPost);

      setExistingPost(response.data);

      navigate(`/board/${postId}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <Container>
      <h2>Fix Post</h2>
      <Form onSubmit={handleFixPost}>
        <PostTitle
          name="title"
          placeholder="Title"
          value={existingPost.title}
          onChange={handleInputChange}
        />
        <Content
          name="content"
          placeholder="Content"
          value={existingPost.content}
          onChange={handleInputChange}
        />
        <FileInputContainer>
          <HiddenFileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </FileInputContainer>
        {imagePreview && <ImagePreview src={imagePreview} alt="Image Preview" />}

        <Button type="submit">Fix Post</Button>
      </Form>
    </Container>
  );
};

export default FixPostPage;