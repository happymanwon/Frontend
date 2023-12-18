import styled from "styled-components";

import LocationInfo from "@/components/LocationInfo";
import ImageUpload from "@/components/ImageUpload";
import { StoreData } from "@/types/category/storeData";

import {
  faMagnifyingGlass,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import cameraImg from "@/assets/images/camera.svg";
import pinImg from "/map-pin.svg";
import tagImg from "/tag.svg";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TagifyComponent from "@/components/TagifyComponent";

import useUserStore from "@/stores/useUserStore";

const NewPostPage = () => {
  const { accessToken } = useUserStore();

  const [mapModal, setMapModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [isMapAdded, setIsMapAdded] = useState(false);
  const [isImageAdded, setIsImageAdded] = useState(false);

  const [storeData, setStoreData] = useState<StoreData[] | null>(null);
  const [storeAddr, setStoreAddr] = useState(""); // 글 내용 속 가게 주소
  const [storeName, setStoreName] = useState(""); // 글 내용 속 가게 이름
  const [showImages, setShowImages] = useState<string[]>([]);

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [tags, setTags] = useState<string[]>([]); // 태그 상태
  const [content, setContent] = useState(""); // 컨텐츠 상태

  const navigate = useNavigate();

  // 지도 모달창 부분
  function MapModal() {
    const [searchName, setSearchName] = useState("");

    const handleSearch = async () => {
      try {
        const response = await axios.get("/api/shops");

        const filterDataByName = response.data.data.filter((data) =>
          data.name.includes(searchName)
        );
        setStoreData(filterDataByName);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleNameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.target as HTMLButtonElement;
      setStoreName(button.name);
      setStoreAddr(button.value);
      setMapModal(false);
      setIsMapAdded(true);
      setStoreData(null); // 데이터 초기화
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };

    return (
      <ModalContainer $isOpen={mapModal} onClick={() => setMapModal(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <InputContainer>
            <input
              type="text"
              value={searchName}
              placeholder="가게이름을 검색해주세요"
              onKeyUp={handleKeyPress}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <IconContainer onClick={handleSearch}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </IconContainer>
          </InputContainer>
          <ListContainer>
            {storeData?.length === 0 ? (
              <p>검색결과가 없습니다.</p>
            ) : (
              storeData?.map((data: any, index: number) => (
                <button
                  onClick={handleNameClick}
                  value={`${data.roadAddress}`}
                  name={`${data.name}`}
                  key={index}
                >
                  {data.name}
                </button>
              ))
            )}
          </ListContainer>
        </ModalContent>
      </ModalContainer>
    );
  }

  // 이미지 모달창 부분
  function ImageModal() {
    const handleAddImages = (e) => {
      const selectedFiles = Array.from(e.target.files || []) as File[];
      const updatedImageFiles = [...imageFiles, ...selectedFiles];
      setImageFiles(updatedImageFiles);

      setShowImages((prevImages) => [
        ...(prevImages || []),
        ...selectedFiles.map((file) => URL.createObjectURL(file)),
      ]);

      setImageModal(false);
      setIsImageAdded(true);
    };

    return (
      <ModalContainer $isOpen={imageModal} onClick={() => setImageModal(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <div className="image-modal">
            <label htmlFor="input-file" onChange={handleAddImages}>
              사진 업로드하기
              <input type="file" id="input-file" multiple />
            </label>
          </div>
        </ModalContent>
      </ModalContainer>
    );
  }

  const handleImageConfirmation = (images) => {
    setShowImages(images);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content); // content 추가
    formData.append("roadName", storeAddr); // 주소추가
    formData.append("shopName", storeName); // 가게 이름 추가

    // 기존의 태그 데이터 추가
    for (const tag of tags) {
      formData.append("hashtagNames", tag);
    }

    // 이미지 파일 추가
    for (const image of imageFiles) {
      formData.append("multipartFiles", image); // Append the image directly
    }

    try {
      const response = await axios.post("/api/boards", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data", // 파일 전송 시 필요한 헤더
        },
      });
      console.log("Data sent successfully!", response.data);
      navigate("/community");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <LayoutContainer>
      <Header>
        <div className="left" onClick={() => navigate("/community")}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="new-post-header">
          <h2>단짠단짠 글쓰기</h2>
          <button onClick={handleSubmit}>완료</button>
        </div>
        <TagInput>
          <div>
            <img src={tagImg} />
          </div>
          <div className="tags">
            <TagifyComponent tags={tags} setTags={setTags} />
          </div>
        </TagInput>
      </Header>
      <ContentWrapper>
        <PostContainer>
          <PostWrapper
            name="content"
            value={content}
            onChange={handleContentChange}
            placeholder="자유롭게 이야기를 적어보세요! (글자 수는 최소 10자 이상 500자 미만)"
          ></PostWrapper>
        </PostContainer>
        {isMapAdded && (
          <MapContainer>
            <LocationInfo address={storeAddr} way={""} />
          </MapContainer>
        )}
        {isImageAdded && (
          <ImageContainer>
            <ImageUpload
              showImages={showImages}
              setShowImages={handleImageConfirmation}
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
            />
          </ImageContainer>
        )}
      </ContentWrapper>
      <BottomButtonWrapper>
        <button>
          <img
            src={cameraImg}
            alt="사진추가버튼"
            loading="lazy"
            onClick={() => {
              setImageModal(!imageModal);
            }}
          />
        </button>
        <button
          className="map-pin"
          onClick={() => {
            setMapModal(!mapModal);
          }}
        >
          <img src={pinImg} alt="지도추가버튼" loading="lazy" />
        </button>
      </BottomButtonWrapper>
      {mapModal ? <MapModal /> : null}
      {imageModal ? <ImageModal /> : null}
    </LayoutContainer>
  );
};

//모달 스타일링
const ModalContainer = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  border-radius: 8px;
  width: 22.5rem;
  max-height: 25rem;
  overflow: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }

  .image-modal {
    text-align: center;

    label {
      display: inline-block;
      font-size: inherit;
      line-height: normal;
      vertical-align: middle;
      cursor: pointer;
      padding: 6px 25px;
      background-color: ${({ theme }) => theme.colors.mainColor};
      border-radius: 4px;
      color: ${({ theme }) => theme.colors.white};
    }
    input[type="file"] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
    }
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 22.5rem;
  height: 2.75rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.mainColor};
  margin-bottom: 10px;

  & input {
    position: absolute;
    width: 314px;
    height: 28px;
    font-size: 14px;
    padding: 8px 38px 8px 8px;
    background: transparent;
    border: none;
  }
  & input:focus {
    outline: none;
  }
`;

const ListContainer = styled.div`
  .store-name {
    font-size: 14px;
  }
  .store-address {
    margin-left: 5px;
    color: ${({ theme }) => theme.colors.grey};
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  width: 38px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.mainColor};
`;

//페이지 스타일링
const LayoutContainer = styled.div`
  width: 100%;
  font-family: NotoSansRegularWOFF, sans-serif, Arial;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Header = styled.div`
  width: 100%;
  /* height: 3.9375rem; */
  padding-top: 33px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyUnderLine};
  display: flex;
  flex-direction: column;
  gap: 7px;

  .left {
    position: absolute;
    left: 0;
    margin-left: 15px;
  }
  .new-post-header {
    display: flex;
    justify-content: space-around;
    button {
      cursor: pointer;
    }
  }
  h2 {
    text-align: center;
    font-size: 16px;
    font-family: NotoSansMediumWOFF, sans-serif, Arial;
    font-weight: 700;
  }
  button {
    border: none;
    background: none;
    position: absolute;
    right: 0;
    margin-right: 20px;
    cursor: pointer;
  }
`;

const TagInput = styled.div`
  display: flex;
  justify-content: start;
  width: 26rem;
  position: relative;
  img {
    position: absolute;
    left: 0;
    margin: 10px 0 0 23px;
  }
  .tags {
    margin: 7px 0 0 45px;
  }
`;

const ContentWrapper = styled.div`
  height: calc(100vh - 6.125rem - 3rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.3125rem;
  gap: 10px;
`;

const PostWrapper = styled.textarea`
  width: 22.125rem;
  height: 12.625rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.greyUnderLine};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 17px 12px;
  outline: none;
  .tag,
  .content {
    font-size: 14px;
  }

  .img {
    margin: 10px;
    display: flex;
    gap: 5px;
  }
  .images {
    border-radius: 8px;
    width: 6.8125rem;
  }
  .post-end {
    font-size: 12px;
    display: flex;
    justify-content: end;
    align-items: center;
  }
`;

const MapContainer = styled.div`
  width: 23.5rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.greyUnderLine};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
  margin-top: 20px;
  p {
    padding-left: 10px;
    font-size: 12px;
  }
  h3 {
    padding: 10px 0 0 10px;
    font-size: 14px;
    font-weight: 700;
  }
  #map {
    margin-top: 10px;
  }
`;

const ImageContainer = styled.div`
  padding-bottom: 15px;
`;

const BottomButtonWrapper = styled.nav`
  width: 26rem;
  height: 3rem;
  display: flex;
  padding-left: 10px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.greyUnderLine};
  button {
    border: none;
    background: none;
    cursor: pointer;
    img {
      width: 26px;
      height: 26px;
    }
  }
`;
export default NewPostPage;
