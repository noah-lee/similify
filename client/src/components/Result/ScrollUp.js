import { useState, useEffect } from "react";
import styled from "styled-components";

import { FiChevronUp } from "react-icons/fi";

const ScrollUp = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);

  // Only show scroll up once user scrolls 100px down
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    });
  }, []);

  // Scroll up
  const handleScrollUpClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showScrollUp && (
        <ScrollUpIcon
          onClick={handleScrollUpClick}
          aria-label="Scroll back to the top of the page"
        >
          <FiChevronUp size="40px" />
        </ScrollUpIcon>
      )}
    </>
  );
};

const ScrollUpIcon = styled.button`
  position: sticky;
  /* right: 64px; */
  bottom: 0px;
  margin-right: 32px;

  height: 40px;
  border-radius: 50%;
  transform: translate(0, -64px);
  align-self: flex-end;

  background-color: var(--color-dark-main);

  &:hover,
  &:focus {
    color: var(--color-orange-accent);
    background-color: var(--color-dark-light);
  }
`;

export default ScrollUp;
