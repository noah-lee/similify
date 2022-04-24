import styled from "styled-components";

import { FiX } from "react-icons/fi";

const Close = ({ size, handleClose }) => {
  return (
    <Wrapper onClick={handleClose}>
      <FiX size={size} color="gray" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Close;
