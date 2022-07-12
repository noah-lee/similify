// Libraries
import styled, { keyframes } from 'styled-components';

// Misc
import { ReactComponent as SimilifyLoader } from '../assets/similify_loader.svg';

const LoadingIcon = ({ size, padding }) => {
  return (
    <Wrapper padding={padding}>
      <SimilifyLoader width={size} height={size} />
    </Wrapper>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg)}
  100% { transform: rotate(360deg)}
`;

const Wrapper = styled.div`
  animation: ${spin} 3s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding} 0;
`;

export default LoadingIcon;
