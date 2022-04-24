// Libraries
import styled from "styled-components";

const ResultHeader = () => {
  return (
    <HeaderArea>
      <HeaderTitle>Title</HeaderTitle>
      <HeaderTime>Time</HeaderTime>
      <HeaderBpm>BPM</HeaderBpm>
      <HeaderKey>Key</HeaderKey>
      <HeaderSpacer />
    </HeaderArea>
  );
};

const HeaderArea = styled.div`
  padding: 16px;

  display: flex;
  width: 100%;
  gap: 16px;

  font-weight: bold;
`;

const HeaderTitle = styled.p`
  flex: 1;
  min-width: 224px;
`;

const HeaderTime = styled.p`
  width: 48px;
`;

const HeaderBpm = styled.p`
  width: 48px;
`;

const HeaderKey = styled.p`
  width: 64px;
`;

const HeaderSpacer = styled.div`
  width: 48px;
`;

export default ResultHeader;
