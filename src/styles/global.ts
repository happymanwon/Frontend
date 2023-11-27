import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import NotoSansWOFF from "../fonts/NotoSans-Medium.woff";

export const GlobalStyle = createGlobalStyle`
${reset}
@font-face {
    font-family: 'NotoSansWOFF';
    src: local('NotoSansWOFF'), local('NotoSansWOFF');
        font-style: normal;
        src: url(${NotoSansWOFF}) format('woff');
}
`;
