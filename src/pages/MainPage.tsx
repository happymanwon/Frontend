import styled from "styled-components";
import Category from "@/components/Category";
import korImg from "@/assets/images/c-kor.svg";
import cnImg from "@/assets/images/c-cn.svg";
import jpImg from "@/assets/images/c-jp.svg";
import etcImg from "@/assets/images/c-etcfood.svg";
import hairIcon from "@/assets/images/c-hair.svg";
import laundryIcon from "@/assets/images/c-laundry.svg";
import etcIcon from "@/assets/images/c-etc.svg";

const MainPage = (): JSX.Element => {
  return (
    <MainContainer>
      <MainView>
        <TitleWrapper>
          <h2>만원의 행복!</h2>
          <div>
            <span className="normal">단돈 만원대로 이용 가능한</span>
            <span className="bold"> 착한가게</span>
          </div>
        </TitleWrapper>
        <CategoryWrapper>
          <Category />
          <div className="three-categories">
            <span>미용</span>
            <span>세탁</span>
            <span>기타</span>
          </div>
        </CategoryWrapper>
      </MainView>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 26.5rem;
  height: calc(100vh - 6.125rem - 4.5rem);
  margin: auto;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  font-family: NotoSansRegularWOFF, sans-serif, Arial;
`;

const MainView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  h2 {
    font-size: 26px;
    color: ${({ theme }) => theme.colors.mainColor};
  }
  span {
    font-size: 18px;

    &.bold {
      font-weight: 700;
      color: ${({ theme }) => theme.colors.mainColor};
    }
  }
`;

const CategoryWrapper = styled.div`
  button {
    cursor: pointer;
  }
  .category-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  #category-button-1 {
    background-image: url(${korImg});
    border: none;
    border-radius: 10px;
    width: 11.125rem;
    height: 11.125rem;
    color: transparent;
  }
  #category-button-2 {
    background-image: url(${cnImg});
    border: none;
    border-radius: 10px;
    width: 11.125rem;
    height: 11.125rem;
    color: transparent;
  }
  #category-button-3 {
    background-image: url(${jpImg});
    border: none;
    border-radius: 10px;
    width: 11.125rem;
    height: 11.125rem;
    color: transparent;
  }
  #category-button-4 {
    background-image: url(${etcImg});
    border: none;
    border-radius: 10px;
    width: 11.125rem;
    height: 11.125rem;
    color: transparent;
  }

  #category-button-5 {
    background-image: url(${hairIcon});
    border: none;
    border-radius: 10px;
    box-shadow: 2px 2px 4px 0px #0000001a;
    width: 6.5625rem;
    height: 6.5625rem;
    color: transparent;
  }
  #category-button-6 {
    background-image: url(${laundryIcon});
    border: none;
    border-radius: 10px;
    box-shadow: 2px 2px 4px 0px #0000001a;
    width: 6.5625rem;
    height: 6.5625rem;
    color: transparent;
  }
  #category-button-7 {
    background-image: url(${etcIcon});
    border: none;
    border-radius: 10px;
    box-shadow: 2px 2px 4px 0px #0000001a;
    width: 6.5625rem;
    height: 6.5625rem;
    color: transparent;
  }
  .three-categories {
    font-size: 16px;
    font-weight: 500;
    margin: 12px 0 22px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export default MainPage;
