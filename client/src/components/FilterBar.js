// Packages
import styled from 'styled-components';

// React components
import CustomSlider from './CustomSlider';

const FilterBar = ({ bpmRange, setBpmRange, keyRange, setKeyRange }) => {
  return (
    <Wrapper>
      <H2>Recommendations</H2>
      <CustomSlider
        label="BPM"
        value={bpmRange}
        setValue={setBpmRange}
        min={0}
        max={20}
        width={160}
        height={16}
      />
      <CustomSlider
        label="Key"
        value={keyRange}
        setValue={setKeyRange}
        min={0}
        max={6}
        width={160}
        height={16}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 768px;
  padding: 16px;
  border-radius: 16px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 32px;

  background-color: var(--color-dark-contrast);
`;

const H2 = styled.h2`
  font-weight: bold;
`;

export default FilterBar;
