import React from 'react';
import styled from 'styled-components';

const ViewPostPageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 20px;
  
`;

const PostContentWrapper = styled.div`
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

const Date = styled.span`
  font-size: 14px;
  color: #888;
`;

const Content = styled.div`
  font-size: 16px;
  margin-bottom: 16px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 16px;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LikeCount = styled.span``;

const CommentCount = styled.span``;

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

class ViewPostPage extends React.Component {
  render() {
    return (
      <ViewPostPageWrapper>
        <PostContentWrapper>
          <Title>
            제목 불러와야함
            <Date>Date</Date>
          </Title>
          <Content>내용 불러와야함</Content>
          {/* Image */}
          <MetaInfo>
            <LikeCount>💜</LikeCount>
            <CommentCount>🗒️</CommentCount>
          </MetaInfo>
        </PostContentWrapper>
        <CommentSection>
          <CommentInput type="text" placeholder="Comment" />
          <CommentButton>✏️</CommentButton>
        </CommentSection>
      </ViewPostPageWrapper>
    );
  }
}

export default ViewPostPage;