import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import NotoSansMediumWOFF from "../fonts/NotoSans-Medium.woff";
import NotoSansRegularWOFF from "../fonts/NotoSans-Regular.woff";
import NotoSansLightWOFF from "../fonts/NotoSans-Light.woff";

export const GlobalStyle = createGlobalStyle`
${reset}
@font-face {
    font-family: 'NotoSansMediumWOFF';
    src: local('NotoSansMediumWOFF'), local('NotoSansMediumWOFF');
        font-style: normal;
        src: url(${NotoSansMediumWOFF}) format('woff');
}
@font-face {
    font-family: 'NotoSansRegularWOFF';
    src: local('NotoSansRegularWOFF'), local('NotoSansRegularWOFF');
        font-style: normal;
        src: url(${NotoSansRegularWOFF}) format('woff');
}

@font-face {
    font-family: 'NotoSansLightWOFF';
    src: local('NotoSansLightWOFF'), local('NotoSansLightWOFF');
        font-style: normal;
        src: url(${NotoSansLightWOFF}) format('woff');
}


`;
