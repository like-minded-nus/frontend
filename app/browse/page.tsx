import Menu from '../components/menu';
import MenuControl from '../components/menu-control';
import MatchCard from '../components/match-card';
import Breadcrumb from '../components/breadcrumb';

const Browse = () => {
  return (
    <>
      <Menu />
      <MenuControl />
      <div className='main-container'>
        <Breadcrumb />
        <MatchCard />
      </div>
    </>
  );
};

export default Browse;
