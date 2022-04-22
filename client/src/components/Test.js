import axios from "axios";
import styled from "styled-components";

const Test = () => {
  const handleClick = (ev) => {
    const asyncTest = (async () => {
      const res = await axios("/api/test");
      console.log(res.data);
    })();
  };

  return <Button onClick={handleClick}>Test</Button>;
};

const Button = styled.button`
  padding: 16px;
  background-color: var(--color-dark-contrast);
  border-radius: 32px;
  font-weight: bold;
`;

export default Test;
