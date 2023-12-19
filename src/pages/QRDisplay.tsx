import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QRDisplay = () => {
  const { purchaseId } = useParams<{ purchaseId: string }>();
  const navigate = useNavigate();

  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (purchaseId) {
        try {
          const response = await axios.get(
            `/api/zzan-items/purchase/use?id=${Number(purchaseId)}`
          );
          setResult(response.data.message);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Invalid purchaseQr value:", purchaseId);
      }
    };

    fetchData();
  }, [purchaseId]);

  return (
    <QRPageContainer>
      <Header>
        <div className="left" onClick={() => navigate("/mypage")}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="new-post-header">
          <h2>QR 사용확인</h2>
        </div>
      </Header>
      <Message>{result}</Message>
    </QRPageContainer>
  );
};

const QRPageContainer = styled.div`
  width: 100%;
  font-family: NotoSansRegularWOFF;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Header = styled.div`
  width: 100%;
  height: 3.9375rem;
  padding-top: 33px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyUnderLine};
  display: flex;
  flex-direction: column;

  .left {
    position: absolute;
    left: 0;
    margin-left: 15px;
    cursor: pointer;
  }
  .new-post-header {
    display: flex;
    justify-content: space-around;
  }
  h2 {
    text-align: center;
    font-size: 16px;
    font-family: NotoSansMediumWOFF;
    font-weight: 700;
  }
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  color: ${({ theme }) => theme.colors.grey};
`;

export default QRDisplay;
