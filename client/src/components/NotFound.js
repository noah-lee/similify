// Libraries
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Wrapper>
      <SectionTitle>
        4<Accent>0</Accent>4
      </SectionTitle>
      <Text>Oops! Page not found 😓</Text>
      <HomeLink to="/">Return Home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 128px;
  gap: 64px;
`;

const SectionTitle = styled.h2`
  font-size: 12rem;
  font-weight: bold;
`;

const Accent = styled.span`
  color: var(--color-orange-accent);
`;

const Text = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: gray;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 20px;
  background-color: var(--color-dark-contrast);
  font-weight: bold;
  border-radius: 32px;

  &:hover {
    background-color: var(--color-dark-light);
    color: var(--color-orange-accent);
  }
`;

export default NotFound;
