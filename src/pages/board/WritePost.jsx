import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

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
  background-image: url("./image-add-button_icon-icons.com_71462.png");
  background-size: 30px;
  background-position: center;
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
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
  width: 200px;
  height: 200px;
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

const WritePostPage = ({ onAddPost }) => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({ title: '', content: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setNewPost((prevPost) => ({ ...prevPost, image: file }));
  };

  const handleAddPost = () => {
    if (newPost.title && newPost.content && newPost.image) {
      onAddPost(newPost);
      setNewPost({ title: '', content: '', image: null });
      setImagePreview(null);

      // board로 다시??
      navigate('/board');
    }
  };

  return (
    <Container>
      <h2>Write a New Post</h2>
      <Form onSubmit={handleAddPost}>
        <PostTitle
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleInputChange}
        />
        <Content
          name="content"
          placeholder="Content"
          value={newPost.content}
          onChange={handleInputChange}
        />
        <FileInputContainer>
          <HiddenFileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <img src=""></img>
        </FileInputContainer>
        {imagePreview && <ImagePreview src={imagePreview} alt="Image Preview" />}

        <Button type="submit">
          Add Post
        </Button>
      </Form>
    </Container>
  );
};

export default WritePostPage;