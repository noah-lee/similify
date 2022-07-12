// Packages
import styled from 'styled-components';

// React components
import SearchBar from '../components/SearchBar';
import TopSearches from '../components/TopSearches';

// Styled Components
import { Accent } from '../styles/global.css';

const Homepage = () => {
  return (
    <Wrapper>
      <div>
        <Text>Search & Discover</Text>
        <Text>Spotify Music</Text>
        <Text>
          with <Accent>BPM</Accent> & <Accent>key</Accent>
        </Text>
      </div>
      <SearchBar />
      <TopSearches />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 64px 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
`;

const Text = styled.p`
  font-size: 1.5rem;
  text-align: center;
  line-height: 2rem;
`;

export default Homepage;
