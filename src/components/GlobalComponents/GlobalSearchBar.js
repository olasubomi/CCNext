import React from "react";
import styled from "styled-components";

function GlobalSearchBar({
  width,
  height,
  inputPlaceholder,
  borderLeft,
  borderRight,
  borderTop,
  borderBottom,
  inputPadding,
  inputRadius,
  inputFont,
  inputBgColor,
  iconWidth,
  iconHeight,
  iconMl,
  placeholderColor,
}) {
  return (
    <ContainerGroup
      width={width}
      height={height}
      inputPadding={inputPadding}
      inputRadius={inputRadius}
      inputFont={inputFont}
      inputBgColor={inputBgColor}
      borderLeft={borderLeft}
      borderRight={borderRight}
      borderTop={borderTop}
      borderBottom={borderBottom}
      iconHeight={iconHeight}
      iconWidth={iconWidth}
      iconMl={iconMl}
      placeholderColor={placeholderColor}
    >
      <input type="text" placeholder={inputPlaceholder} />
      <img src="/assets/grocery_list/Search.svg" alt="search icon" />
    </ContainerGroup>
  );
}

export default GlobalSearchBar;
export const ContainerGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  //justify-content: center;
  position: relative;
  width: 100%;

  && input {
    outline: none;
    width: ${({ width }) => width || "100%"};
    height: ${({ height }) => height || "48px"};
    padding-left: ${({ inputPadding }) => inputPadding || "10px"};
    border-left: ${({ borderLeft }) => borderLeft || "2px solid #a1a1a1"};
    border-right: ${({ borderRight }) => borderRight || "2px solid #a1a1a1"};
    border-top: ${({ borderTop }) => borderTop || "2px solid #a1a1a1"};
    border-bottom: ${({ borderBottom }) => borderBottom || "2px solid #a1a1a1"};
    border-radius: ${({ inputRadius }) => inputRadius || "8px 8px 8px 8px"};
    font-size: ${({ inputFont }) => inputFont || "16px"};
    background-color: ${({ inputBgColor }) => inputBgColor || "#ffffff"};
  }
  input::placeholder {
    color: ${({ placeholderColor }) =>
      placeholderColor || "#8c8c8c"}; /* Firefox */
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${({ placeholderColor }) => placeholderColor || "#8c8c8c"};
  }

  input::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${({ placeholderColor }) => placeholderColor || "#8c8c8c"};
  }

  && img {
    position: absolute;
    width: ${({ iconWidth }) => iconWidth || "20px"};
    height: ${({ iconHeight }) => iconHeight || "20px"};
    margin-left: ${({ iconMl }) => iconMl || "250px"};
  }
`;
