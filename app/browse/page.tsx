import Menu from '../components/menu';
import MenuControl from '../components/menu-control';
import MatchCard from '../components/match-card';
import { SkeletonTheme } from 'react-loading-skeleton';

const Browse = () => {
  return (
    <SkeletonTheme baseColor="#cacaca" highlightColor="#373737">
    <>
      <Menu />
      <MenuControl />
      <div className='main-container'>
        <MatchCard />
      </div>
    </>
    </SkeletonTheme>
  );
};

export default Browse;
