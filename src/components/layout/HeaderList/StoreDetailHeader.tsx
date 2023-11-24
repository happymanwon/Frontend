import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StoreDetailHeader = () => {
  const navigate = useNavigate();

  return (
    <CategoryHeaderContainer>
      <CategoryHeaderWrapper>
        <div className="left" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div>상점사진 sh_photo</div>
        <h2>상점이름sh_name</h2>
      </CategoryHeaderWrapper>
      <header>
        <div>지역|주메뉴 또는 주력상품</div>
      </header>
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

export default StoreDetailHeader;
