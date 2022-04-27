import styled from "styled-components";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const BpmRange = ({
  seedFeatures,
  width,
  bpmRange,
  setBpmRange,
  setRefresh,
}) => {
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
    <Wrapper aria-label="Slider to change musical BPM search range">
      <SliderContainer>
        <BpmText>BPM</BpmText>
        <SliderText>{bpmRange < 20 ? `±${bpmRange}` : "All"}</SliderText>
        <CustomSlider width={width}>
          <StyledInput
            width={width}
            type="range"
            step={1}
            max={20}
            value={bpmRange}
            onChange={handleBpmChange}
            onMouseUp={handleRefresh}
            onTouchEnd={handleRefresh}
          />
          <StyledTrack />
          <StyledRange bpmRange={bpmRange} max={20} />
        </CustomSlider>
      </SliderContainer>
      <TextContainer>
        <Text style={{ textAlign: "left" }}>
          {bpmRange < 20
            ? `${+seedFeatures.tempo.toFixed() - bpmRange}`
            : "All"}
        </Text>
        <FiArrowLeft />
        <Text
          style={{ color: "var(--color-orange-accent)", textAlign: "center" }}
        >
          {+seedFeatures.tempo.toFixed()}
        </Text>
        <FiArrowRight />
        <Text style={{ textAlign: "right" }}>
          {bpmRange < 20
            ? `${+seedFeatures.tempo.toFixed() + bpmRange}`
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
  position: relative;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const BpmText = styled.p`
  font-weight: bold;
  line-height: 32px;
  width: 40px;
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

  &:focus {
    &::-webkit-slider-thumb {
      outline: auto var(--color-orange-accent);
    }
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
  width: ${(props) => (props.bpmRange / props.max) * 100}%;
  background-color: rgba(255, 175, 65, 0.2);
  left: 0;
  top: 0;
  z-index: 1;
`;

const SliderText = styled.p`
  width: 32px;
  color: grey;
  font-weight: bold;
  line-height: 32px;
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

export default BpmRange;
