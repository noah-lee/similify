// Libraries
import { useContext } from "react";
import styled from "styled-components";

// Components
import { SpotifyContext } from "../../contexts/SpotifyContext";
import BpmRange from "./BpmRange";
import KeyRange from "./KeyRange";

const Filter = ({
  seedFeatures,
  bpmRange,
  setBpmRange,
  keyRange,
  setKeyRange,
  showCamelot,
  setShowCamelot,
  setRefresh,
}) => {
  const { width, breakpointX } = useContext(SpotifyContext);

  // Handle Show Key/Camelot Click
  const handleCamelotClick = () => {
    setShowCamelot((prevState) => !prevState);
  };

  return (
    <Wrapper width={width} breakpointX={breakpointX}>
      <BpmRange
        width="160px"
        seedFeatures={seedFeatures}
        bpmRange={bpmRange}
        setBpmRange={setBpmRange}
        setRefresh={setRefresh}
      />
      <KeyRange
        width="160px"
        seedFeatures={seedFeatures}
        keyRange={keyRange}
        setKeyRange={setKeyRange}
        setRefresh={setRefresh}
      />
      <CamelotButton onClick={handleCamelotClick}>
        {showCamelot ? "Show Key" : "Show Camelot"}
      </CamelotButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${({ width, breakpointX }) => (width > breakpointX ? "100%" : "")};
  max-width: 768px;
  padding: 16px;
  border-radius: 16px;

  display: flex;
  flex-direction: ${({ width, breakpointX }) =>
    width > breakpointX ? "row" : "column"};
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  background-color: var(--color-dark-contrast);
`;

const CamelotButton = styled.button`
  width: 140px;
  border-radius: 32px;
  padding: 16px;

  font-weight: bold;
  background-color: var(--color-dark-main);

  &:hover {
    color: var(--color-orange-accent);
    background-color: var(--color-dark-light);
  }
`;

export default Filter;
