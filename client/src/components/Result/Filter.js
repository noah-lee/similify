// Libraries
import { useContext } from "react";
import styled from "styled-components";

// Components
import { SpotifyContext } from "../../contexts/SpotifyContext";
import BpmRange from "./BpmRange";
import KeyRange from "./KeyRange";

const Filter = ({
  bpmRange,
  setBpmRange,
  keyRange,
  setKeyRange,
  showCamelot,
  setShowCamelot,
  setRefresh,
}) => {
  const { width, breakpoint } = useContext(SpotifyContext);

  // Handle Show Key/Camelot Click
  const handleCamelotClick = () => {
    setShowCamelot((prevState) => !prevState);
  };

  return (
    <Wrapper width={width} breakpoint={breakpoint}>
      <BpmRange
        width="120px"
        bpmRange={bpmRange}
        setBpmRange={setBpmRange}
        setRefresh={setRefresh}
      />
      <KeyRange
        width="120px"
        keyRange={keyRange}
        setKeyRange={setKeyRange}
        setRefresh={setRefresh}
      />
      <CamelotButton onClick={handleCamelotClick}>
        {showCamelot ? "Camelot" : "Key"}
      </CamelotButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${({ width, breakpoint }) => (width > breakpoint ? "100%" : "")};
  padding: 16px;
  border-radius: 16px;

  display: flex;
  flex-direction: ${({ width, breakpoint }) =>
    width > breakpoint ? "row" : "column"};
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  background-color: var(--color-dark-contrast);
`;

const CamelotButton = styled.button`
  width: 96px;
  height: 32px;
  border-radius: 16px;
  padding: 0 16px;

  font-weight: bold;
  background-color: var(--color-dark-main);

  &:hover {
    color: var(--color-orange-accent);
    background-color: var(--color-dark-light);
  }
`;

export default Filter;
