import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface SelectBoxPropsType {
  options: string[][];
  selectedValue: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isMain: boolean;
}

const SelectBox: React.FC<SelectBoxPropsType> = ({ options, selectedValue, onClick: onClickParent, isMain }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(false);
    onClickParent(e);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("button")) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <StyledSelect>
      <ButtonSelect className={isOpen ? "on" : ""} onClick={handleOpen} isMain={isMain}>
        <SelectSpan>{selectedValue}</SelectSpan>
        <FontAwesomeIcon icon={faAngleRight} />
      </ButtonSelect>
      {isOpen && (
        <SelectList isMain={isMain}>
          {options.map((option) => (
            <ListItem key={option[1]} isMain={isMain}>
              <button
                type="button"
                id={option[0]}
                name={option[1]}
                onClick={handleSelect}
                className={option[1] === selectedValue ? "selected" : ""}
              >
                {option[1]}
              </button>
            </ListItem>
          ))}
        </SelectList>
      )}
    </StyledSelect>
  );
};

const StyledSelect = styled.div`
  position: relative;
  font-size: 0.875rem;
`;

interface ButtonSelectPropsType {
  isMain: boolean;
}

const ButtonSelect = styled.button<ButtonSelectPropsType>`
  width: 5rem;
  height: 2rem;
  border: none;
  background: ${(props) => (props.isMain ? "#59d37d" : "#fff")};
  color: ${(props) => (props.isMain ? "#fff" : "#1A1A1A")};
  text-align: left;
  padding: 0;
  position: relative;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &.on,
  &:focus {
    outline: none;
    border-radius: 0.5rem;
  }

  &.on svg {
    transform: rotate(-270deg);
  }
`;

const SelectSpan = styled.span`
  /* margin-left: 1.5rem; */
`;

interface SelectListPropsType {
  isMain: boolean;
}
const SelectList = styled.ul<SelectListPropsType>`
  width: fit-content;
  position: absolute;
  top: 1.8rem;
  left: 0;
  z-index: 1;
  border-radius: 0.5rem;
  background: ${(props) => (props.isMain ? "#59d37d" : "#fff")};
  color: #fff;
  height: 30rem;
  overflow: auto;
  display: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${ButtonSelect}.on + & {
    display: block;
  }
`;

interface ListItemPropsType {
  isMain: boolean;
}
const ListItem = styled.li<ListItemPropsType>`
  padding: 0.1rem 0.1rem;

  &:not(:last-child) {
  }

  button {
    width: 100%;
    height: 2rem;
    padding: 0 0.8rem;
    text-align: left;
    border-radius: 0.5rem;
    border: 0;
    background: ${(props) => (props.isMain ? "#59d37d" : "#fff")};
    color: ${(props) => (props.isMain ? "#fff" : "#1A1A1A")};
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
    }

    &:focus {
    }

    &.selected {
      font-weight: bold;
    }
  }
`;

export default SelectBox;
