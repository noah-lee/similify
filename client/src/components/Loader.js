import styled, { keyframes } from "styled-components";
import { ReactComponent as SimilifyLoader } from "../assets/similify_loader.svg";

const Loader = () => {
  return (
    <Wrapper>
      <SimilifyLoader width="32" height="32" />
    </Wrapper>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg)}
  100% { transform: rotate(360deg)}
`;

const Wrapper = styled.div`
  animation: ${spin} 3s linear infinite;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loader;
