import Navbar from '@/Components/Navbar';
import { Link, Head } from '@inertiajs/react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import UserInfo from './UserInfo';


export default function Menu({ auth }) {
    const categories = [
        { id: 1, name: 'Смартфони' },
        { id: 2, name: 'Авто' },
        { id: 3, name: 'Меблі' }
    ];

    return (
        <>
            <Head title="Menu" />

            <Navbar auth={auth} categories={categories}></Navbar>

            <Container>
                <Row>
                    <Col sm={3}>
                        <Nav className="flex-column">
                            <Nav.Link href={route('lot.all')}>Лоти</Nav.Link>
                            <Nav.Link href={route('wishlist')}>Ставки</Nav.Link>
                            <Nav.Link href={route('wishlist')}>Персональні дані</Nav.Link>
                            <Nav.Link href={route('wishlist')}>Список бажаного</Nav.Link>
                        </Nav>
                    </Col>
                    <Col sm={9}>

                    </Col>
                </Row>
            </Container>

            <footer className="py-16 text-center text-sm text-black dark:text-white/70">

            </footer>

        </>
    );
}