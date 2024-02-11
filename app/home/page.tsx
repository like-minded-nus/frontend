'use client'
import { useRouter } from 'next/navigation';
import Demo from '../components/demo';
import Menu from '../components/menu';
import { useEffect } from 'react';
import MenuControl from '../components/menu-control';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        if (sessionStorage.getItem("userId") === null) {
            router.push("/login")
        }
    }, []);

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