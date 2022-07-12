// Packages
import { useState } from 'react';
import styled from 'styled-components';

const CustomSlider = ({ label, value, setValue, min, max, width, height }) => {
  const [local, setLocal] = useState(value);

  const handleChange = (ev) => {
    const val = +ev.target.value;
    setLocal(val);
  };

  const updateValue = () => {
    setValue(local);
  };

  return (
    <Wrapper>
      <Label height={height}>{label}</Label>
      <Slider width={width}>
        <Thumb
          type="range"
          width={width}
          height={height}
          min={min}
          max={max}
          value={local}
          onChange={handleChange}
          onMouseUp={updateValue}
          onTouchEnd={updateValue}
        />
        <Track width={width} height={height} />
        <Fill value={local} min={min} max={max} width={width} height={height} />
      </Slider>
      <Label height={height}>{local === max ? 'All' : `±${local}`}</Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Slider = styled.div`
  position: relative;
  width: ${({ width }) => width}px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const Label = styled.p`
  font-weight: bold;
  width: 32px;
  height: ${({ height }) => height}px;

  display: flex;
  align-items: center;
`;

const Thumb = styled.input`
  -webkit-appearance: none;
  position: absolute;
  width: ${({ width }) => width}px;
  top: ${({ height }) => height / 2}px;
  height: 0;
  margin: 0;
  outline: none;
  z-index: 2;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    position: relative;
    width: 16px;
    height: ${({ height }) => height}px;
    border-radius: 50%;
    background-color: var(--color-orange-accent);
    cursor: pointer;
  }

  &:focus {
    &::-webkit-slider-thumb {
      outline: auto var(--color-orange-accent);
    }
  }
`;

const Track = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;

  background-color: var(--color-dark-light);
  border-radius: 8px;
`;

const Fill = styled.div`
  width: ${({ value, min, max }) => (value / (max - min)) * 100}%;
  height: ${({ height }) => height}px;

  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;

  background-color: rgba(255, 175, 65, 0.2);
  border-radius: 8px;
`;

export default CustomSlider;
