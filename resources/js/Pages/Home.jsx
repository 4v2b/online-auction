import { Link, Head } from '@inertiajs/react';

export default function Home({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Home" />

                <nav class="navbar navbar-expand-md navbar-light bg-dark">

                    {auth.user ? (
                        <>
                            <Link
                                href={route('dashboard')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Profile
                            </Link>
                            <Link
                                href={route('logout')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Log Out
                            </Link>

                        </>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    <form class="form-inline my-2 my-md-0">
                        <input class="form-control" type="text" placeholder="Search"></input>
                    </form>
                </nav>


            <main className="mt-6">

            </main>

            <footer className="py-16 text-center text-sm text-black dark:text-white/70">

            </footer>

        </>
    );
}
