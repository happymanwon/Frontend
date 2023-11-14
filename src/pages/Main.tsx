import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

const categories: { [key: number]: string } = {
  1: "한식",
  2: "중식",
  3: "일식",
  4: "기타 외식업",
  5: "미용업",
  6: "목욕, 기타서비스",
  7: "세탁",
  8: "숙박",
};

const Main = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number) => {
    // Handle the category click event
    setSelectedCategory(categoryId);

    // Now you can send `categoryId` to your backend
    // Example: sendToBackend(categoryId);
  };
  return (
    <Container>
      <SearchPage>왼쪽 검색창</SearchPage>
      <MobilePage>
        <h2>만원의 행복</h2>
        <p>단돈 만원대로 이용 가능한 갓성비 착한가게</p>
        <CategoryWrapper>
          {Object.keys(categories).map((categoryId) => (
            <Link
              key={categoryId}
              to={`/category/${Number(categoryId)}`}
              className={
                Number(categoryId) === selectedCategory ? "selected" : ""
              }
            >
              <button onClick={() => handleCategoryClick(Number(categoryId))}>
                {categories[Number(categoryId)]}
              </button>
            </Link>
          ))}
        </CategoryWrapper>
      </MobilePage>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1024px;
  height: 100%;
  margin: 50px auto; // 위아래 50px, 좌우는 중앙정렬
`;

const SearchPage = styled.div`
  width: 400px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MobilePage = styled.div`
  width: 425px;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const CategoryWrapper = styled.div`
  gap: 0.2rem;
  width: 417px;
  button {
    width: 200px;
    &.selected {
      background-color: #ccc;
    }
  }
`;

export default Main;
