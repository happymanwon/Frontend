import { useEffect, useRef } from "react";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";

import styled from "styled-components";

interface TagifyComponentProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}
const TagifyComponent: React.FC<TagifyComponentProps> = ({ tags, setTags }) => {
  const tagifyRef = useRef(null);
  const tagifyDropdownRef = useRef(null);
  const initialValue = tags;

  useEffect(() => {
    if (tagifyRef.current) {
      const tagify = new Tagify(tagifyRef.current, {
        // value: tags,
        // 옵션 설정
        dropdown: {
          maxItems: Infinity,
          enabled: 0,
          closeOnSelect: false,
          appendTarget: tagifyDropdownRef.current,
        },
      });

      tagify.addTags(tags.map((tag) => ({ value: tag })));

      tagify.on("add", () => {
        setTags(tagify.value.map((item) => item.value));
      });

      tagify.on("remove", () => {
        setTags(tagify.value.map((item) => item.value));
      });

      tagify.on("input", (e) => {
        console.log(e.detail);
        console.log("유스", initialValue);
      });

      return () => {
        // 컴포넌트 언마운트 시, 리스너 해제 등 정리 작업 수행
        tagify.destroy();
      };
    }
  }, [tags, setTags]);

  return (
    <TagContainer>
      <InputContainer>
        <input
          ref={tagifyRef}
          className="tagify"
          placeholder="Enter 입력 시 태그 적용"
        />
      </InputContainer>
      <DropdownContainer ref={tagifyDropdownRef} />
    </TagContainer>
  );
};

const TagContainer = styled.div`
  display: flex;
`;

const InputContainer = styled.div`
  .tagify {
    --tag-bg: ${({ theme }) => theme.colors.mainColor};
    --tag-hover: ${({ theme }) => theme.colors.mainColor2};
    --tag-text-color: ${({ theme }) => theme.colors.white};
    --tags-border-color: ${({ theme }) => theme.colors.grey};
    --tag-border-radius: 25px;
    --tag-text-color--edit: ${({ theme }) => theme.colors.black};
    --tag-remove-bg: var(--tag-hover);
    --tag-inset-shadow-size: 1.35em;
    --tag-remove-btn-bg--hover: ${({ theme }) => theme.colors.black};
    display: inline-block;
    border: none;
    font-size: 11px;
    width: inherit;

    .tagify__tag {
      max-width: 23rem;
      overflow: hidden;
    }
    .tagify__tag > div {
      max-width: 93%;
      overflow: hidden;
    }
  }
`;

const DropdownContainer = styled.div`
  /* Dropdown 스타일링 */
`;

export default TagifyComponent;
