// Libraries
import styled from 'styled-components';

// Components
import Logo from './Logo';
import ConnectBtn from './ConnectBtn';

const Header = () => {
  return (
    <Wrapper>
      <Logo size={32} />
      <Spacer />
      <ConnectBtn />
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  max-width: 1280px;
  height: 96px;
  margin: 0 auto;
  padding: 16px;

  display: flex;
  align-items: center;

  font-weight: bold;
`;

const Spacer = styled.div`
  flex: 1;
`;

export default Header;
