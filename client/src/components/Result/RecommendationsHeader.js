// Libraries
import { useEffect, useState } from "react";
import styled from "styled-components";

// Misc.
import { toLetterKey } from "../../utils/key";

const RecommendationsHeader = ({
  seedFeatures,
  bpmRange,
  keyRange,
  refresh,
}) => {
  const [headers, setHeaders] = useState(
    <Wrapper>
      Similar Songs between{" "}
      <Accent>
        {bpmRange < 20 ? `${+seedFeatures.tempo.toFixed() - bpmRange}` : "All"}
      </Accent>{" "}
      to{" "}
      <Accent>
        {bpmRange < 20 ? `${+seedFeatures.tempo.toFixed() + bpmRange}` : "All"}{" "}
        BPM{" "}
      </Accent>
      &{" "}
      <Accent>
        {keyRange < 6
          ? toLetterKey(seedFeatures.key - keyRange, seedFeatures.mode)
          : "All"}
      </Accent>{" "}
      to{" "}
      <Accent>
        {keyRange < 6
          ? toLetterKey(seedFeatures.key + keyRange, seedFeatures.mode)
          : "All"}
      </Accent>
    </Wrapper>
  );

  // Only update headers when refresh is triggered
  useEffect(() => {
    setHeaders(
      <Wrapper>
        Similar Songs between{" "}
        <Accent>
          {bpmRange < 20
            ? `${+seedFeatures.tempo.toFixed() - bpmRange}`
            : "All"}
        </Accent>{" "}
        to{" "}
        <Accent>
          {bpmRange < 20
            ? `${+seedFeatures.tempo.toFixed() + bpmRange}`
            : "All"}{" "}
          BPM{" "}
        </Accent>
        &{" "}
        <Accent>
          {keyRange < 6
            ? toLetterKey(seedFeatures.key - keyRange, seedFeatures.mode)
            : "All"}
        </Accent>{" "}
        to{" "}
        <Accent>
          {keyRange < 6
            ? toLetterKey(seedFeatures.key + keyRange, seedFeatures.mode)
            : "All"}
        </Accent>
      </Wrapper>
    );
  }, [refresh]);

  return <>{headers}</>;
};

const Wrapper = styled.h2`
  width: 100%;
  font-weight: bold;
  padding: 16px;
`;

const Accent = styled.span`
  color: var(--color-orange-accent);
`;

export default RecommendationsHeader;
