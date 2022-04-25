import styled from "styled-components";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { toLetterKey } from "../../utils/key";

const KeyRange = ({
  seedFeatures,
  width,
  keyRange,
  setKeyRange,
  setRefresh,
}) => {
  // Handle key change
  const handleKeyChange = (ev) => {
    const value = Number(ev.target.value);
    setKeyRange(value);
  };

  // Handle refresh on mouse up
  const handleRefresh = () => {
    setRefresh((prevState) => !prevState);
  };

  return (
    <Wrapper>
      <SliderContainer>
        <KeyText>Key</KeyText>
        <CustomSlider width={width}>
          <StyledInput
            width={width}
            type="range"
            step={1}
            max={6}
            value={keyRange}
            onChange={handleKeyChange}
            onMouseUp={handleRefresh}
            onTouchEnd={handleRefresh}
          />
          <StyledTrack />
          <StyledRange keyRange={keyRange} max={6} />
        </CustomSlider>
      </SliderContainer>
      <TextContainer>
        <Text style={{ textAlign: "left" }}>
          {keyRange < 6
            ? toLetterKey(seedFeatures.key - keyRange, seedFeatures.mode)
            : "All"}
        </Text>
        <FiChevronLeft />
        <Text style={{ color: "var(--color-orange-accent)", textAlign: "center" }}>
          {toLetterKey(seedFeatures.key, seedFeatures.mode)}
        </Text>
        <FiChevronRight />
        <Text style={{ textAlign: "right" }}>
          {keyRange < 6
            ? toLetterKey(seedFeatures.key + keyRange, seedFeatures.mode)
            : "All"}
        </Text>
      </TextContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const KeyText = styled.p`
  font-weight: bold;
  line-height: 32px;
  width: 48px;
`;

const CustomSlider = styled.div`
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
  background-color: var(--color-dark-light);
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

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Text = styled.p`
  font-weight: bold;
  line-height: 32px;
  width: 48px;
`;

export default KeyRange;
