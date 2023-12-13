import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import NotoSansMediumWOFF from "../fonts/NotoSans-Medium.woff";
import NotoSansRegularWOFF from "../fonts/NotoSans-Regular.woff";
import NotoSansLightWOFF from "../fonts/NotoSans-Light.woff";

interface GlobalProps {
  zoom: number;
}

export const GlobalStyle = createGlobalStyle<GlobalProps>`
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

input, button, span, div, p, h1, h2, h3, h4, h5, h6, a, li, ul, ol, textarea, select, option, label, img, table, tr, td, th, form, fieldset, legend, article, aside, footer, header, nav, section, time, canvas, figure, figcaption, audio, video, embed, object, iframe, details, summary, menu, mark, hr, code, pre, samp, sub, sup, b, i, u, s, small, strong, strike, tt, big, nobr, var, address, cite, dfn, em, font, img, ins, kbd, q, ruby, rp, rt, tt, var, wbr, abbr, acronym, bdo, button, del, fieldset, iframe, input, ins, kbd, label, legend, select, textarea, th, button, input, select, textarea, optgroup, option, fieldset {
  font-family: 'NotoSansRegularWOFF';
}

body {
  zoom: ${(props) => props.zoom};
}

`;
