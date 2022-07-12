// Libraries
import { useContext } from 'react';
import styled from 'styled-components';

// Components
import { ResponsiveContext } from '../contexts/ResponsiveContext';

const ResultHeader = () => {
  const { width, breakpointX } = useContext(ResponsiveContext);

  return (
    <>
      {width > breakpointX ? (
        <HeaderArea>
          <HeaderTitle>Title</HeaderTitle>
          <HeaderTime>Time</HeaderTime>
          <HeaderBpm>BPM</HeaderBpm>
          <HeaderKey>Key</HeaderKey>
        </HeaderArea>
      ) : (
        <HeaderArea>
          <MobileHeader>Title</MobileHeader>
        </HeaderArea>
      )}
    </>
  );
};

const HeaderArea = styled.div`
  padding: 16px;

  display: flex;
  width: 100%;
  gap: 16px;

  font-weight: bold;
`;

const MobileHeader = styled.h2``;

const HeaderTitle = styled.h2`
  flex: 1;
  min-width: 224px;
`;

const HeaderTime = styled.h2`
  width: 48px;
`;

const HeaderBpm = styled.h2`
  width: 48px;
`;

const HeaderKey = styled.h2`
  width: 128px;
`;

export default ResultHeader;
