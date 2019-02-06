import React from 'react';
import { createGlobalStyle } from 'styled-components';
import pxToRem from '../helpers/scales';

const Styles = createGlobalStyle`

@import url("https://p.typekit.net/p.css?s=1&k=irr0yun&ht=tk&f=173.175&a=2544079&app=typekit&e=css");

@font-face {
    font-family:"proxima-nova";
    src:url("https://use.typekit.net/af/27776b/00000000000000003b9b0939/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3") format("woff2"),url("https://use.typekit.net/af/27776b/00000000000000003b9b0939/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3") format("woff"),url("https://use.typekit.net/af/27776b/00000000000000003b9b0939/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3") format("opentype");
    font-style:normal;font-weight:600;
    }
    
    @font-face {
    font-family:"proxima-nova";
    src:url("https://use.typekit.net/af/4838bd/00000000000000003b9b0934/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff2"),url("https://use.typekit.net/af/4838bd/00000000000000003b9b0934/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff"),url("https://use.typekit.net/af/4838bd/00000000000000003b9b0934/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("opentype");
    font-style:normal;font-weight:400;
    }

body{
    background-color: ${props => props.theme.colors.blueLight} !important;
    font-family: proxima-nova !important;
    font-style: normal;

}
html {
    @media ${props => props.theme.device.xxl} {
     font-size: 11px !important;
    }
    @media ${props => props.theme.device.xl} {
     font-size: 8px !important;
    }
    @media ${props => props.theme.device.lg} {
     font-size: 7px !important;
    }
    /* @media ${props => props.theme.device.md} {
     font-size: 8px !important;
    }    
    @media ${props => props.theme.device.sm} {
     font-size: px !important;
    } */

}

.ant-select-open .ant-select-arrow-icon svg {
    -webkit-transform: rotate(0deg) !important;
    -ms-transform: rotate(0deg) !important;
    transform: rotate(0deg) !important;
  }

  .ant-select-arrow {
    font-size:${pxToRem(20)} !important;
    margin-top:${pxToRem(-10)} !important;
  }

    .ant-popover-title {
        color: ${props => props.theme.colors.blueDark}  !important;
        font-size: ${pxToRem(18)};
        font-weight: 600 !important;
        
    }

    .ant-form label {
    font-size: ${pxToRem(20)} !important;
  }

`;

const GlobalStyles = () => <Styles />;

export default GlobalStyles;
