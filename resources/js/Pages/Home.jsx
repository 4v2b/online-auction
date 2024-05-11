import Navbar from '@/Components/Navbar';
import { Link, Head } from '@inertiajs/react';

export default function Home({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const categories = [
        {id:1, name: 'Смартфони'},
        {id:2, name: 'Авто'},
        {id:3, name: 'Меблі'}
    ];

    return (
        <>
            <Head title="Home" />

            <Navbar auth={auth} categories={categories}></Navbar>

            <main className="mt-6">

            </main>

            <footer className="py-16 text-center text-sm text-black dark:text-white/70">

            </footer>

        </>
    );
}
