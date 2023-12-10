import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import Category from "@/components/Category";
import { useNavigate, useLocation } from "react-router-dom";

const StoreListHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCategoryPage = location.pathname.includes("/category");

  return (
    <StoreListHeaderContainer>
      <StoreListHeaderWrapper>
        <div className="left" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <h2>만원의 행복</h2>
      </StoreListHeaderWrapper>
      {isCategoryPage && (
        <CategoryWrapper>
          <Category />
        </CategoryWrapper>
      )}
    </StoreListHeaderContainer>
  );
};

const StoreListHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkGrey};
  height: inherit;
  /* padding: 0 23px; */
  &::after {
    content: "";
    width: 10px;
  }
`;

const StoreListHeaderWrapper = styled.div`
  margin-top: 35px;
  display: flex;

  .left {
    position: absolute;
    left: 0;
    margin-left: 15px;
  }

  h2 {
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-top: 4px;

  .category-buttons {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .selected {
    border-bottom: 3px solid ${({ theme }) => theme.colors.mainColor2};
    font-weight: 700;
  }

  button {
    border: none;
    background-color: ${({ theme }) => theme.colors.white};
    font-size: 12px;
    margin: 19px 7px 0 7px;
    padding-bottom: 2px;
    cursor: pointer;
  }
`;

export default StoreListHeader;
