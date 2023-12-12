import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { PostDataType } from "@/types/community/postDataType";
import axios from "axios";

const CommunityHeader = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const { postId } = useParams<{ postId?: string }>(); // 파라미터가 없을 수 있으므로 postId를 옵셔널로 지정
  const [post, setPost] = useState<PostDataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PostDataType[]>(`/data/fakedata.json`); // json 파일 사용

        if (postId) {
          const postData = response.data.filter(
            (item) => item.id === parseInt(postId, 10)
          )[0];
          postData ? setPost(postData) : setPost(null);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, [postId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    navigate(`/community/search?keyword=${encodeURIComponent(search)}`);
  };

  return (
    <CommunityHeaderContainer>
      <CommunityHeaderWrapper>
        <h2>단짠단짠</h2>
      </CommunityHeaderWrapper>
      <InputContainer>
        <input
          type="text"
          placeholder="관심사를 검색해 보세요!"
          value={search}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
        />
        <IconContainer onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </IconContainer>
      </InputContainer>
    </CommunityHeaderContainer>
  );
};

const CommunityHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  padding: 0 23px;
  box-shadow: 0px 2px 2px 0px #0000001a;
  &::after {
    content: "";
    width: 10px;
  }
  .left {
    position: absolute;
    left: 0;
    margin-left: 15px;
  }
`;

const CommunityHeaderWrapper = styled.div`
  margin-top: 35px;
  display: flex;

  .left {
    position: absolute;
    left: 0;
  }

  h2 {
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 25rem;
  height: 2rem;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.greyBackground};
  border: none;

  & input {
    position: absolute;
    width: 24.5rem;
    height: 1.75rem;
    font-size: 14px;
    caret-color: #000;
    background: transparent;
    border: none;
    padding-left: 5px;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  width: 1.4rem;
  height: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.mainColor};
`;

export default CommunityHeader;
