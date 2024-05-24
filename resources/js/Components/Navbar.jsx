import { Link, usePage } from '@inertiajs/react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Heart } from 'react-bootstrap-icons';
import SearchBar from './SearchBar';

export default function NavBar() {

    const { auth, categories } = usePage().props;

    return (
        <Navbar bg="light" expand="md" className="mb-4">
            <Container fluid>
                <SearchBar categories={categories} />

                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center">
                        {auth.user ? (
                            <>
                                <Nav.Link as={Link} href={route('wishlist')} aria-label="Wishlist">
                                    <Heart className="me-2" />
                                </Nav.Link>
                                <Nav.Link as={Link} href={route('userinfo')}>
                                    Профіль
                                </Nav.Link>
                                <Nav.Link as={Link} href={route('logout')} method="post">
                                    Вийти
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} href={route('login')}>
                                    Ввійти
                                </Nav.Link>
                                <Nav.Link as={Link} href={route('register')}>
                                    Зареєструватися
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}