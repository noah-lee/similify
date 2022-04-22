import styled from "styled-components";

import BpmRange from "./BpmRange";
import KeyRange from "./KeyRange";

const Filter = ({
  bpmRange,
  setBpmRange,
  keyRange,
  setKeyRange,
  setRefresh,
}) => {
  // Handle refresh button click
  const handleRefreshClick = () => {
    setRefresh((prevState) => !prevState);
  };

  return (
    <Wrapper>
      <BpmRange bpmRange={bpmRange} setBpmRange={setBpmRange} />
      <KeyRange keyRange={keyRange} setKeyRange={setKeyRange} />
      <RefreshButton onClick={handleRefreshClick}>Refresh</RefreshButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* width: 645px; */
  width: 609px;
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-dark-contrast);
`;

const RefreshButton = styled.button`
  height: 32px;
  padding: 0 16px;
  border-radius: 16px;
  font-weight: bold;
  background-color: var(--color-dark-main);

  &:hover {
    color: var(--color-orange-accent);
    background-color: var(--color-dark-light);
  }
`;

export default Filter;
