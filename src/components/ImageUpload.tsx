import styled from "styled-components";

const ImageUpload = ({ setShowImages, showImages }) => {
  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return (
    <div>
      <PreviewWrapper>
        {showImages.map((image, id) => (
          <ImageContainer key={id}>
            <img src={image} alt={`${image}-${id}`} loading="lazy" />
            <button onClick={() => handleDeleteImage(id)}>X</button>
          </ImageContainer>
        ))}
      </PreviewWrapper>
    </div>
  );
};

const PreviewWrapper = styled.div`
  width: 23.5rem;
  display: flex;
  justify-content: start;
  overflow: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-top: 20px;
`;
const ImageContainer = styled.div`
  position: relative; /* Set position to relative for containing the button */
  margin-right: 10px; /* Add spacing between images */
  img {
    width: 6.8125rem;
    height: 6.8125rem;
    border-radius: 8px;
  }
  button {
    position: absolute; /* Position the delete button absolutely */
    top: 5px; /* Adjust the top position as needed */
    right: 5px; /* Adjust the right position as needed */
    background: none;
    border: none;
    padding: 0;
    color: white;
    cursor: pointer;
    opacity: 0; /* Initially hide the button */
    transition: opacity 0.3s ease;
  }
  &:hover button {
    opacity: 1; /* Show the button on hover */
  }
`;
export default ImageUpload;
