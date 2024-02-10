import Demo from './components/demo';
import Menu from './components/menu';
import MenuControl from './components/menu-control';

const Home = () => {
    return (
        <>
            <Menu />
            <MenuControl />
            <div className='main-container'>
                <Demo />
            </div>
        </>
    );
};

export default Home;
