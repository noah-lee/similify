import { useState, useRef } from "react";
import styled from "styled-components";

const BpmSlider = () => {
  const min = 25;
  const max = 75;

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const minValRef = useRef(null);
  const maxValRef = useRef(null);

  const handleMinInputChange = (ev) => {
    const value = Math.min(Number(ev.target.value), maxVal - 1);
    setMinVal(value);
  };

  const handleMaxInputChange = (ev) => {
    const value = Math.max(Number(ev.target.value), minVal + 1);
    setMaxVal(value);
  };

  return (
    <Wrapper>
      <Slider>
        <StyledInput
          type="range"
          id="left-slider"
          step={5}
          value={minVal}
          onChange={handleMinInputChange}
        />
        <StyledInput
          type="range"
          step={5}
          id="right-slider"
          value={maxVal}
          onChange={handleMaxInputChange}
        />
        <Track />
        <Range maxVal={maxVal} minVal={minVal} />
      </Slider>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const StyledInput = styled.input`
  position: absolute;
  top: 4px;
  width: 200px;
  height: 0;
  margin: 0;
  outline: none;
  pointer-events: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  z-index: 3;

  &::-webkit-slider-thumb {
    position: relative;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--color-orange-accent);
    cursor: pointer;
    pointer-events: all;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }
`;

const Slider = styled.div`
  position: relative;
  width: 200px;
  height: 8px;
  margin: 4px 0;
`;

const Track = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: white;
  z-index: 1;
`;

const Range = styled.div`
  position: absolute;
  height: 100%;
  border-radius: 4px;
  background-color: rgba(255, 175, 65, 0.7);
  z-index: 2;
  left: ${(props) => props.minVal}%;
  width: ${(props) => props.maxVal - props.minVal}%;
`;

export default BpmSlider;
