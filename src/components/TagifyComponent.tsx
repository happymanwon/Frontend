import { useEffect, useRef } from "react";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";

import styled from "styled-components";

const TagifyComponent = ({ setTags }) => {
  const tagifyRef = useRef(null);
  const tagifyDropdownRef = useRef(null);

  useEffect(() => {
    if (tagifyRef.current) {
      const tagify = new Tagify(tagifyRef.current, {
        // 옵션 설정
        maxTags: 3,
        dropdown: {
          maxItems: Infinity,
          enabled: 0,
          closeOnSelect: false,
          appendTarget: tagifyDropdownRef.current,
        },
      });

      tagify.on("add", (e) => {
        setTags(tagify.value.map((item) => item.value));
      });

      tagify.on("remove", (e) => {
        setTags(tagify.value.map((item) => item.value));
      });

      return () => {
        // 컴포넌트 언마운트 시, 리스너 해제 등 정리 작업 수행
        tagify.destroy();
      };
    }
  }, [setTags]);

  return (
    <TagContainer>
      <InputContainer>
        <input
          ref={tagifyRef}
          className="tagify"
          placeholder="해시태그를 입력해 보세요"
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
  }
`;

const DropdownContainer = styled.div`
  /* Dropdown 스타일링 */
`;

export default TagifyComponent;
