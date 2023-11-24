import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import Category from "@/components/Category";
import { useNavigate } from "react-router-dom";

const CategoryHeader = () => {
  const navigate = useNavigate();

  return (
    <CategoryHeaderContainer>
      <CategoryHeaderWrapper>
        <div className="left" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <h2>만원의 행복</h2>
      </CategoryHeaderWrapper>
      <CategoryWrapper>
        <Category />
      </CategoryWrapper>
    </CategoryHeaderContainer>
  );
};

const CategoryHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkGrey};
  height: inherit;
  padding: 0 23px;
  &::after {
    content: "";
    width: 10px;
  }
`;

const CategoryHeaderWrapper = styled.div`
  margin-top: 20px;
  display: flex;

  .left {
    position: absolute;
    left: 0;
  }

  h2 {
    text-align: center;
    font-size: 18px;
    font-weight: 700;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;

  .selected {
    border-bottom: 3px solid ${({ theme }) => theme.colors.lightGreen};
  }

  button {
    border: none;
    background-color: ${({ theme }) => theme.colors.white};
    font-weight: 700;
    font-size: 14px;
    padding: 15px 8px 0 8px;
  }
`;

export default CategoryHeader;
