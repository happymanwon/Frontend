import styled from "styled-components";
import kbImg from "/kb.jpeg";
import wooriImg from "/woori.png";
import shinhanImg from "/shinhan.png";
import nhImg from "/nh.png";
import hanaImg from "/hana.png";
import ibkImg from "/ibk.jpeg";
import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Bank {
  image: string;
  name: string;
}

interface Account {
  id: number;
  image: string;
  bankName: string;
  accountNumber: string;
}

const BankList: Bank[] = [
  { image: kbImg, name: "국민은행" },
  { image: wooriImg, name: "우리은행" },
  { image: shinhanImg, name: "신한은행" },
  { image: nhImg, name: "농협" },
  { image: hanaImg, name: "하나은행" },
  { image: ibkImg, name: "기업은행" },
];

const MypageCharge = () => {
  const [addAccount, setAddAccount] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountIdCounter, setAccountIdCounter] = useState<number>(2);

  const [savedAccounts, setSavedAccounts] = useState<Account[]>([
    { id: 1, image: nhImg, bankName: "농협", accountNumber: "3553292390433" },
  ]);

  const handleSaveAccount = () => {
    if (selectedBank && accountNumber) {
      setAddAccount(false);
      setSavedAccounts([
        ...savedAccounts,
        {
          id: accountIdCounter,
          image: selectedBank.image,
          bankName: selectedBank.name,
          accountNumber,
        },
      ]);
      setSelectedBank(null);
      setAccountNumber("");
      setAccountIdCounter(accountIdCounter + 1);
    }
  };

  const handleDeleteAccount = (id: number) => {
    const updatedAccounts = savedAccounts.filter(
      (account) => account.id !== id
    );
    setSavedAccounts(updatedAccounts);
  };

  return (
    <ChargeContainer>
      {savedAccounts.map((account) => (
        <AccountItem key={account.id}>
          <img src={account.image} alt={account.bankName} />
          <span className="bank">{account.bankName}</span>
          <span>{account.accountNumber}</span>
          <IconContainer onClick={() => handleDeleteAccount(account.id)}>
            <FontAwesomeIcon icon={faXmark} size="2xs" />
          </IconContainer>
        </AccountItem>
      ))}
      <ManageButton
        onClick={() => {
          setAddAccount(!addAccount);
        }}
      >
        + 연결계좌 추가하기
      </ManageButton>
      {addAccount && (
        <AccountAddContainer>
          <BankListContainer>
            {BankList.map((bank, index) => (
              <BankListItem key={index} onClick={() => setSelectedBank(bank)}>
                <img src={bank.image} alt={bank.name} />
                <span>{bank.name}</span>
              </BankListItem>
            ))}
          </BankListContainer>
          <AccountInfo>
            {selectedBank && (
              <span className="bank-name">
                <img src={selectedBank.image} alt={selectedBank.name} />
                <span>{selectedBank.name}</span>
              </span>
            )}
            <div className="input-button-group">
              <input
                type="text"
                placeholder="계좌번호 입력"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <button onClick={handleSaveAccount}>저장</button>
            </div>
          </AccountInfo>
        </AccountAddContainer>
      )}
    </ChargeContainer>
  );
};

const ChargeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: calc(100% - 2.75rem);
`;

const AccountItem = styled.div`
  width: 100%;
  height: 3.0625rem;
  display: flex;
  align-items: center;
  border-radius: 9px;
  border: 1px solid ${({ theme }) => theme.colors.greyUnderLine};
  gap: 7px;
  margin-bottom: 7px;
  font-size: 15px;
  img {
    margin-left: 5px;
    width: 23px;
  }
  .bank {
    color: ${({ theme }) => theme.colors.mainColor};
    font-family: NotoSansMediumWOFF;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grey};
  margin-right: 35px;
`;

const ManageButton = styled.button`
  border: none;
  background: none;
  font-size: 14px;
  font-family: NotoSansMediumWOFF;
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 20px;
  cursor: pointer;
`;

const AccountAddContainer = styled.div`
  margin-top: 20px;
  img {
    width: 23px;
  }
`;

const BankListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
`;

const BankListItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  padding: 10px;
  border: 0.5px solid ${({ theme }) => theme.colors.grey};
  border-radius: 5px;
`;

const AccountInfo = styled.div`
  width: 23.8125rem;
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 14px;

  .bank-name {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .input-button-group {
    display: flex;
    gap: 10px;
    padding: 10px;
    background-color: white;
  }

  .input-button-group input {
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    outline: none;
    border-radius: 5px;
    width: 200px;
  }

  .input-button-group button {
    border: none;
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: ${({ theme }) => theme.colors.white};
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default MypageCharge;
