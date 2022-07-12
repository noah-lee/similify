// Packages
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
import { H1 } from '../styles/global.css';

// Assets
import { ReactComponent as Icon } from '../assets/similify_logo.svg';

const Logo = ({ size }) => {
  return (
    <StyledLink to="/">
      <Icon width={size} height={size} aria-label="Similify icon" />
      <StyledH1 size={size}>Similify</StyledH1>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  display: flex;
  align-items: center;
  gap: 8px;

  &:focus {
    outline: auto var(--color-orange-accent);
  }
`;

const StyledH1 = styled(H1)`
  font-size: ${({ size }) => `${size}px`};
`;

export default Logo;
