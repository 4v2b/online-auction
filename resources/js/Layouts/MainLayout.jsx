import Authenticated from "@/Layouts/AuthenticatedLayout";
import Guest from "@/Layouts/GuestLayout";

export default function MainLayout({ auth, header, children }) {
    
    return (
        <>
            {auth.user ?
                (<Authenticated user={auth.user} header={header}>
                    {children}
                </Authenticated>)
                :
                (<Guest>
                    {children}
                </Guest>)
            }
        </>
    );
}