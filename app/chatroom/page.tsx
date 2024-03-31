import Base from '../components/base';
import Chatroom from './chatroom';

const Browse = () => {
  const component = <Chatroom />;

  return <Base content={component} />;
};

export default Browse;
