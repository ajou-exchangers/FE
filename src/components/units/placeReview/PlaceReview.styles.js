import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const ReviewHeader = styled.div`
  width: 100%;
  height: 160px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
`;

export const HeaderTotalReviewWrapper = styled.div`
  width: 120px;
  height: 120px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HeaderTotalReviewScore = styled.div`
  width: 100%;
  height: 64px;
  margin: 0;
  padding: 0;
  font-size: 56px;
  font-weight: 400;
  color: #222;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderTotalReviewRateWrapper = styled.div`
  width: 100%;
  height: 24px;
  margin: 0;
  padding: 0;
`;

export const HeaderTotalReviewCount = styled.div`
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 400;
  color: #222;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderReviewButton = styled.button`
  width: 100%;
  height: 3rem;
  margin: 0 0 1rem 0;
  background-color: #2b2144;
  border-radius: 16px;
  border: none;
  outline: none;
  font-size: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
`;

export const ReviewList = styled.div`
  width: 100%;
  height: calc(100% - 200px);
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const ReviewItem = styled.div`
  width: 100%;
  height: 30rem;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const ReviewItemHeader = styled.div`
  width: 100%;
  height: 80px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const ReviewUserImage = styled.img`
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  border-radius: 50%;
`;

export const ReviewUserWrapper = styled.div`
  width: calc(100% - 40px);
  height: 100%;
  margin-left: 12px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const ReviewUserNickname = styled.span`
  font-size: 16px;
  height: 20px;
  font-weight: 600;
  color: #222;
`;

export const ReviewUserDate = styled.span`
  font-size: 12px;
  height: 20px;
  font-weight: 400;
  color: #222;
`;

export const ReviewItemBody = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
`;

export const ReviewItemRateWrapper = styled.div`
  width: 100%;
  height: 20px;
  margin: 0 0 8px 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const ReviewItemBodyComment = styled.span`
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 8px 0;
  color: #222;
`;

export const ReviewCardImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  margin: 0;
  padding: 0;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  overflow: visible;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ReviewCardImage = styled.img`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0 2px;
`;

export const ReviewKeywordWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 1rem;
  padding: 0;
  display: flex;
  flex-direction: row-wrap;
  align-items: center;
  overflow-x: scroll;
  justify-content: flex-start;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ReviewKeywordBox = styled.div`
  height: 24px;
  margin: 0 4px 0 0;
  padding: 0 8px;
  border-radius: 4px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ReviewKeyword = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #222;
`;
