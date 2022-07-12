// Packages
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiChevronUp } from 'react-icons/fi';

const ScrollUpBtn = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);

  // Only show scroll up once user scrolls 100px down
  useEffect(() => {
    const yOffset = () => {
      const offset = window.pageYOffset;
      if (offset > 100) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };

    window.addEventListener('scroll', yOffset);

    return () => window.removeEventListener('scroll', yOffset);
  }, []);

  // Handle scroll up click
  const handleScrollUpClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showScrollUp && (
        <ScrollUpIcon onClick={handleScrollUpClick}>
          <FiChevronUp size="48px" />
        </ScrollUpIcon>
      )}
    </>
  );
};

const ScrollUpIcon = styled.button`
  position: fixed;
  right: 48px;
  bottom: 48px;

  background-color: var(--color-dark-main);
  border-radius: 50%;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    background-color: var(--color-dark-light);
    color: var(--color-orange-accent);
  }
`;

export default ScrollUpBtn;
