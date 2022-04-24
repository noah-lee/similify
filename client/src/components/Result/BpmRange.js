import styled from "styled-components";

const BpmRange = ({ width, bpmRange, setBpmRange, setRefresh }) => {
  // Handle BPM change
  const handleBpmChange = (ev) => {
    const value = Number(ev.target.value);
    setBpmRange(value);
  };

  // Handle refresh on mouse up
  const handleRefresh = () => {
    setRefresh((prevState) => !prevState);
  };

  return (
    <Wrapper>
      <Text>BPM</Text>
      <StyledContainer width={width}>
        <StyledInput
          width={width}
          type="range"
          step={1}
          max={20}
          value={bpmRange}
          onChange={handleBpmChange}
          onMouseUp={handleRefresh}
          onPointerUp={handleRefresh}
        />
        <StyledTrack />
        <StyledRange bpmRange={bpmRange} max={20} />
      </StyledContainer>
      <Text style={{ width: "32px" }}>
        {bpmRange < 20 ? "±" + bpmRange : "All"}
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
  width: ${({ width }) => width};
  height: 24px;
  margin: 0;
`;

const StyledInput = styled.input`
  -webkit-appearance: none;
  position: absolute;
  width: ${({ width }) => width};
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
  width: ${(props) => (props.bpmRange / props.max) * 100}%;
  background-color: rgba(255, 175, 65, 0.2);
  left: 0;
  top: 0;
  z-index: 1;
`;

export default BpmRange;
