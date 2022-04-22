import styled from "styled-components";

const KeyRange = ({ keyRange, setKeyRange }) => {

  // Handle key change
  const handleKeyChange = (ev) => {
    const value = Number(ev.target.value);
    setKeyRange(value);
  };

  return (
    <Wrapper>
      <Text>Key</Text>
      <StyledContainer>
        <StyledInput
          type="range"
          step={1}
          max={6}
          value={keyRange}
          onChange={handleKeyChange}
        />
        <StyledTrack />
        <StyledRange keyRange={keyRange} max={6} />
      </StyledContainer>
      <Text style={{ width: "32px" }}>
        {keyRange < 6 ? "±" + keyRange : "All"}
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Text = styled.p`
  font-weight: bold;
  line-height: 32px;
`;

const StyledContainer = styled.div`
  position: relative;
  width: 120px;
  height: 24px;
  margin: 0;
`;

const StyledInput = styled.input`
  -webkit-appearance: none;
  position: absolute;
  width: 120px;
  top: 12px;
  height: 0;
  margin: 0;
  outline: none;
  z-index: 3;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    position: relative;
    width: 16px;
    height: 24px;
    border-radius: 4px;
    background-color: var(--color-orange-accent);
    cursor: pointer;
  }
`;

const StyledTrack = styled.div`
  position: absolute;
  height: 24px;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 0;
`;

const StyledRange = styled.div`
  position: absolute;
  height: 24px;
  width: ${(props) => (props.keyRange / props.max) * 100}%;
  background-color: rgba(255, 175, 65, 0.2);
  left: 0;
  top: 0;
  z-index: 1;
`;

export default KeyRange;
