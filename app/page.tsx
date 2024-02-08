import Demo from './components/demo';
import Menu from './components/menu';

const Home = () => {
    return (
        <>
            <Menu />
            <div className='main-container'>
                <Demo />
            </div>
        </>
    );
};

export default Home;
