import styled from '@emotion/styled';

export const SideWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 872;
`;

export const SearchListWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 436px;
  height: 100%;
  padding: 0 1rem;
  z-index: 1;
`;

export const SearchWrapper = styled.div`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 408px;
  height: 60px;
  border: 1px solid #e5e5e5;
  border-radius: ${(props) => (props.hasInputValue ? '30px 30px 0 0' : '30px')};
  background-color: #fff;
  padding: 0 1rem;
  margin-top: 80px;
  box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, 0.1);
`;

export const SearchInput = styled.input`
  width: 80%;
  height: 80%;
  border: none;
  outline: none;
  font-size: 1.2rem;
  font-weight: 400;

  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  background: url('magnifying-glass-solid.svg') no-repeat;
  width: 25px;
  height: 25px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export const DropdownBox = styled.ul`
  display: block;
  margin: 0 auto;
  padding: 0.5rem 0;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-top: none;
  border-radius: 0 0 30px 30px;
  box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  width: 408px;
  z-index: 10;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DropdownItem = styled.li`
  position: relative;
  list-style: none;
  padding: 8px 1rem;

  &.dropdownItemActive {
    background-color: #f5f5f5;
  }

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

export const SearchListContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 80px;
  box-sizing: border-box;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SearchList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 408px;
  height: 100%;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 30px;
  box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

export const SearchItem = styled.li`

  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ebebeb;
  padding: 10px 0;
  cursor: pointer;
`;

export const SearchItemImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const SearchItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const SearchItemTitle = styled.h3`
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: #222;
`;

export const SearchItemAddress = styled.p`
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 12px;
  font-weight: 400;
  color: #999;
  margin-bottom: 5px;
`;

export const SearchItemComment = styled.p`
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 12px;
  font-weight: 400;
  color: #999;
  margin-bottom: 5px;
`;

export const SearchItemReview = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchItemReviewText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 12px;
  font-weight: 400;
  color: #999;
  margin-left: 5px;
`;

export const SearchDetailWrapper = styled.div`
  position: relative;
  margin-left: 1rem;
  margin-top: 160px;
  height: calc(100vh - 180px);
  width: 100%;
  border-radius: 30px;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  background-color: #fff;
  z-index: 10;
`;

export const SearchDetailContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 436px;
  height: 100%;
  z-index: 1;
`;

export const SearchDetailImg = styled.img`
  width: 100%;
  height: 240px;
  margin: 0;
  padding: 0;
  object-fit: cover;
`;

export const SearchDetailCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
  color: #999;
  font-size: 28px;
  cursor: pointer;
  border-radius: 50%; // 원형 모양을 만들기 위해 추가
  display: flex; // 아래 세 줄은 "X"를 버튼의 중앙에 위치시키기 위해 추가
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
`;

export const SearchDetailHeader = styled.div`
  width: 100%;
  height: 160px;
  margin: 0;
  padding: 1rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
`;

export const SearchDetailKoreanName = styled.h1`
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 24px;
  font-weight: 700;
  color: #222;
`;

export const SearchDetailEnglishName = styled.h2`
  width: 100%;
  height: 20px;
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 400;
  color: #222;
`;

export const SearchDetailCategory = styled.h3`
  width: 100%;
  height: 20px;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 400;
  color: #999;
`;

export const SearchDetailNav = styled.div`
  width: 100%;
  height: 60px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #e5e5e5;
`;

export const SearchDetailNavButton = styled.button`
  background-color: #fff;
  width: 100%;
  height: 2rem;
  margin: 0;
  padding: 0;
  border: none;
  font-size: 14px;
  font-weight: 700;
  border-bottom: ${(props) => (props.active ? '3px solid #2b2144' : 'none')};

  &:hover {
    cursor: pointer;
  }
`;

export const SearchDetailTitle = styled.h2`
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: 700;
  color: #222;
`;

export const SearchDetailBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: calc(100% - 140px);
  margin: 0;
  padding: 1rem 1.2rem;
`;

export const SearchDetailInfo = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
`;

export const SearchDetailInfoAddress = styled.p`
  width: 100%;
  height: 20px;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 400;
  color: #222;
`;

export const SearchDetailInfoDescription = styled.p`
  width: 100%;
  height: 20px;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 400;
  color: #222;
`;

export const SearchDetailReview = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
`;

export const SearchDetailReviewItem = styled.div`
  width: 100%;
  height: 480px;
  margin: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

export const SearchDetailReviewItemHeader = styled.div`
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`;

export const SearchDetailReviewItemProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

export const SearchDetailReviewItemNickname = styled.h3`
  width: 100%;
  height: 20px;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: #222;
`;

export const SearchDetailReviewItemCreatedAt = styled.p`
  width: 100%;
  height: 20px;
  margin: 0;
  padding: 0;
  font-size: 12px;
  font-weight: 400;
  color: #999;
`;

export const SearchDetailReviewItemRating = styled.div`
  width: 100%;
  height: 20px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`;

export const SearchDetailReviewItemRatingStar = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const SearchDetailReviewItemRatingText = styled.p`
  width: 100%;
  height: 20px;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 400;
  color: #222;
`;

export const SearchDetailReviewItemBody = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

export const SearchDetailReviewItemBodyText = styled.p`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 400;
  color: #222;
`;
