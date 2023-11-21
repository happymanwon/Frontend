import styled from "styled-components";
import Category from "@/components/Category";

const Main = (): JSX.Element => {
  return (
    <MainContainer>
      <MainPage>
        <TitleWrapper>
          <h2>만원의 행복</h2>
          <div>
            <span className="normal">단돈 만원대로 이용 가능한</span>
            <span className="bold"> 착한가게</span>
          </div>
        </TitleWrapper>
        <CategoryWrapper>
          <Category />
        </CategoryWrapper>
      </MainPage>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 26.5rem;
  height: calc(100vh - 6.125rem - 4.5rem);
  margin: auto;
  overflow: scroll;
`;

const MainPage = styled.div`
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
  }
  span {
    font-size: 18px;

    &.bold {
      font-weight: bold;
    }
  }
`;

const CategoryWrapper = styled.div`
  .category-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    
    &.selected {
      background-color: #ccc;
    }
  }

  .category-button-1,
  .category-button-2,
  .category-button-3,
  .category-button-4 {
    background-color: #aab2b5;
    border: none;
    border-radius: 10px;
    width: 10.625rem;
    height: 10.625rem;
    font-size: 26px;
    color: #fff;

  }
    .category-button-5,
    .category-button-6,
    .category-button-7,
    .category-button-8 {
      background-color: #f3f4f6;
      border: none;
      border-radius: 10px;
      width: 5rem;
      height: 5rem;
      font-size: 18px;
    }
    
  }
`;

export default Main;
