import Navbar from '@/Components/NavBar';
import MainLayout from '@/Layouts/MainLayout';
import { Link, Head } from '@inertiajs/react';

export default function Home() {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };
    return (
        <>
            <Head title="Головна" />

            <MainLayout>

            </MainLayout>

        </>
    );
}
