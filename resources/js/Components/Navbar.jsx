import { Link } from '@inertiajs/react';
import { Heart } from 'react-bootstrap-icons';
import SearchBar from './SearchBar';

export default function Navbar({ auth, categories }) {

    return (
        <nav class="navbar navbar-expand-md navbar-light bg-light">
            <div class="container-fluid">

                <SearchBar categories={categories}></SearchBar>

                {auth.user ? (
                    <>
                        <Link
                            href={route('menu')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Профіль
                        </Link>
                        <Link
                            href={route('logout')} method='post'
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Вийти
                        </Link>

                    </>
                ) : (
                    <>
                        <Link
                            href={route('wishlist')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            <Heart />
                        </Link>
                        <Link
                            href={route('login')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Ввійти
                        </Link>
                        <Link
                            href={route('register')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Зареєструватися
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}