import Image from 'next/image';
import Menu from './components/menu';

export default function Home() {
    return (
        <>
            <Menu />
            <div className='main-container'>
                <h1>Hello World</h1>
            </div>
        </>
    );
}
