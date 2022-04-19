import styled from "styled-components";

const MatchKey = ({ keyMatch, setKeyMatch }) => {
  const handleKeyClick = (ev) => {
    const value = ev.target.checked;
    setKeyMatch(value);
  };

  return (
    <Wrapper>
      <StyledInput
        type="checkbox"
        id="key-match"
        onChange={handleKeyClick}
        checked={keyMatch}
      />
      <StyledLabel htmlFor="key-match">Key Match</StyledLabel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledInput = styled.input`
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  background: #282828;

  &:checked {
    background: var(--color-orange-accent);
  }

  &:checked:after {
    display: block;
  }
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

export default MatchKey;
