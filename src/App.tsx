import { useState } from "react";
import { Outlet, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme, lightTheme } from "./themes";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atom";

const GlobalStyle = createGlobalStyle`  //createGlobalStyle을 사용하여 여러컴포넌트를 한번에 styled-components 할수 있음.
//reset css
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  font-family: 'Source Sans Pro', sans-serif;
}

a {
  text-decoration: none;
  color: inherit;
}

a:active {
    color: inherit;
}
`;

const DarkBtn = styled.button<{ isdark: boolean }>`
  position: fixed;
  right: 50px;
  top: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.isdark ? "whitesmoke" : "#2f3640")};
  color: ${(props) => (props.isdark ? "#2f3640" : "whitesmoke")};
  &:hover {
    cursor: pointer;
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom); //defult값(value)을 받음.
  const setterIsDark = useSetRecoilState(isDarkAtom); //defult값(value)를 바꿔줌. react state의 setter함수 처럼.
  const toggleDarkAtom = () => setterIsDark((prev) => !prev);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <DarkBtn onClick={toggleDarkAtom} isdark={isDark}>
          {isDark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          )}
        </DarkBtn>
        <Outlet />
        <GlobalStyle />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
