import Base from '../components/base';
import MatchList from './match-list';

const Browse = () => {
  const component = <MatchList />;

  return <Base content={component} />;
};

export default Browse;
