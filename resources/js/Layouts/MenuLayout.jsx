import Navbar from '@/Components/NavBar';
import { Link, Head, router } from '@inertiajs/react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { Button, Container } from 'react-bootstrap';
import UserInfo from '../Pages/UserInfo';
import MainLayout from './MainLayout';
import {House} from 'react-bootstrap-icons'

export default function MenuLayout({children}) {

    return (
        <MainLayout>
            <Container>
                <Row>
                    <Col sm={3}>
                        <Nav className="flex-column">
                            <Nav.Link href={route('lot.all')}>Лоти</Nav.Link>
                            <Nav.Link href={route('bids.all')}>Ставки</Nav.Link>
                            <Nav.Link href={route('userinfo')}>Персональні дані</Nav.Link>
                            <Nav.Link href={route('tracked.all')}>Список бажаного</Nav.Link>
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