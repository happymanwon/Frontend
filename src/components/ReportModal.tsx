import styled from "styled-components";
import checkImg from "@/assets/images/white-check.svg";
import { useState } from "react";

const ReportModal = ({ onCancel, onReport }) => {
  const [reportReason, setReportReason] = useState("");
  const handleReport = () => {
    onReport(reportReason); // reportReason을 부모 컴포넌트로 전달
    // 모달을 닫거나 다른 작업 처리
  };
  return (
    <ModalContainer>
      <ReportOptions>
        <label>
          <input
            type="radio"
            name="report"
            value="거짓 정보"
            onChange={() => setReportReason("거짓 정보")}
          />
          <span>거짓 정보</span>
        </label>
        <label>
          <input
            type="radio"
            name="report"
            value="광고 및 스팸"
            onChange={() => setReportReason("광고 및 스팸")}
          />
          <span>광고 및 스팸</span>
        </label>
        <label>
          <input
            type="radio"
            name="report"
            value="욕설 · 비방 · 혐오 표현"
            onChange={() => setReportReason("욕설 · 비방 · 혐오 표현")}
          />
          <span>욕설 · 비방 · 혐오 표현</span>
        </label>
        <label>
          <input
            type="radio"
            name="report"
            value="희롱 또는 괴롭힘"
            onChange={() => setReportReason("희롱 또는 괴롭힘")}
          />
          <span>희롱 또는 괴롭힘</span>
        </label>
        <label>
          <input
            type="radio"
            name="report"
            value="성적 불쾌함 유발"
            onChange={() => setReportReason("성적 불쾌함 유발")}
          />
          <span>성적 불쾌함 유발</span>
        </label>
      </ReportOptions>
      <Buttons>
        <CancelButton onClick={onCancel}>취소</CancelButton>
        <ReportButton onClick={handleReport}>신고</ReportButton>
      </Buttons>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: absolute;
  width: 382px;
  height: 242px;
  left: calc(50% - 382px / 2 - 0.5px);
  top: 40%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  /* 여기부터는 내부 요소 스타일 */
`;
const Buttons = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 2.4375rem;
`;
const CancelButton = styled.button`
  width: 50%;
  height: 100%;
  font-size: 14px;
  color: #ffffff;
  background: #888888;
  border-bottom-left-radius: 5px;
  border: none;
  cursor: pointer;
`;

const ReportButton = styled.button`
  width: 50%;
  height: 100%;
  font-size: 14px;
  color: #ffffff;
  background: ${({ theme }) => theme.colors.mainColor2};
  border-bottom-right-radius: 5px;
  border: none;
  cursor: pointer;
`;

const ReportOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  font-size: 14px;
  margin: 10px;
  gap: 10px;

  label {
    height: 26px;
  }
  span {
  }
  input {
    appearance: none;
    border: 1px solid gray;
    border-radius: 2px;
    width: 1.4375rem;
    height: 1.4375rem;
    &:checked::after {
      content: "";
      position: absolute;
      width: 1.4375rem;
      height: 1.4375rem;
      background-image: url(${checkImg});
      background-size: contain;
      background-color: ${({ theme }) => theme.colors.mainColor2};
      border-radius: 2px;
    }
  }
`;

export default ReportModal;
