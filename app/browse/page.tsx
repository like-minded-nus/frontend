import Menu from '../components/menu';
import MenuControl from '../components/menu-control';
import MatchCard from '../components/match-card';

const Browse = () => {
    return (
        <>
            <Menu />
            <MenuControl />
            <div className='main-container'>
                <MatchCard />
            </div>
        </>
    );
};

export default Browse;
