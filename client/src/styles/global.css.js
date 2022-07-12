import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  :root {
    --color-orange-accent: #ffaf41;
    --color-dark-main: #0b0b0b;
    --color-dark-contrast: #121212;
    --color-dark-light: #282828;
  }

  body {
    font-family: 'Nunito', sans-serif;
    background-color: var(--color-dark-main);
    color: white;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;

export const H1 = styled.h1`
  font-weight: bold;
  font-size: 3.6rem;
`;

export const H2 = styled.h2`
  font-weight: bold;
  font-size: 2rem;
`;

export const Accent = styled.span`
  font-weight: bold;
  color: var(--color-orange-accent);
`;
