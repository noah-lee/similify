import styled from "styled-components";

const Camelot = ({ showCamelot, setShowCamelot }) => {
  // const handleKeyClick = (ev) => {
  //   const value = ev.target.checked;
  //   setShowCamelot(value);
  // };

  const handleClick = () => {
    setShowCamelot((prevState) => !prevState);
  };

  return (
    // <Wrapper>
    //   <StyledInput
    //     type="checkbox"
    //     id="show-camelot"
    //     onChange={handleKeyClick}
    //     checked={showCamelot}
    //   />
    //   <StyledLabel htmlFor="show-camelot">Camelot</StyledLabel>
    // </Wrapper>
    <StyledButton onClick={handleClick}>{showCamelot ? "Camelot" : "Key"}</StyledButton>
  );
};

const StyledButton = styled.button`
  text-align: left;

  &:hover {
    color: var(--color-orange-accent)
  }
`;

export default Camelot;
