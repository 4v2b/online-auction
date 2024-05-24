import NavBar from "@/Components/NavBar";
import { Head } from "@inertiajs/react";

export default function MainLayout({ children }) {

    return (
        <>
            <NavBar />
            <main>
                {children}
            </main>
        </>
    );
}