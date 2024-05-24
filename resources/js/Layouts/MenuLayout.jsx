import Navbar from '@/Components/NavBar';
import { Link, Head } from '@inertiajs/react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import UserInfo from '../Pages/UserInfo';
import MainLayout from './MainLayout';


export default function MenuLayout({children}) {

    return (
        <MainLayout>
            <Container>
                <Row>
                    <Col sm={3}>
                        <Nav className="flex-column">
                            <Nav.Link href={route('lot.all')}>Лоти</Nav.Link>
                            <Nav.Link href={route('wishlist')}>Ставки</Nav.Link>
                            <Nav.Link href={route('userinfo')}>Персональні дані</Nav.Link>
                            <Nav.Link href={route('wishlist')}>Список бажаного</Nav.Link>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        {children}
                    </Col>
                </Row>
            </Container>

            <footer>

            </footer>

        </MainLayout>
    );
}