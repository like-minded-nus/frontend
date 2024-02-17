import Base from '../components/base';
import Demo from '../components/demo';

const Home = () => {
  const component = <Demo />;

  return <Base content={component} />;
};

export default Home;
