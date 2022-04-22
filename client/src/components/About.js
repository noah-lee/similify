import styled from "styled-components";

const About = () => {
  return (
    <Wrapper>
      <MediumText>About</MediumText>
      <Text>🚧 Under construction 🚧</Text>
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

const MediumText = styled.h3`
  font-size: 2rem;
  font-weight: bold;
`;

const Text = styled.p`
  font-weight: bold;
  color: gray;
  max-width: 480px;
`;

export default About;
