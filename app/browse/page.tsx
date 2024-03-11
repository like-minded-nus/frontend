import Base from '../components/base';
import MatchCard from './match-card';

const Browse = () => {
  const component = <MatchCard />;

  return <Base content={component} />;
};

export default Browse;
