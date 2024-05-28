import { useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100">
            <Head title="Реєстрація" />

            <Row className="justify-content-center w-100">
                <Col md={6} lg={4}>
                    <Form onSubmit={submit}>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Ім'я</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                isInvalid={!!errors.name}
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Ел. пошта</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="password_confirmation" className="mb-3">
                            <Form.Label>Повторіть пароль</Form.Label>
                            <Form.Control
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                isInvalid={!!errors.password_confirmation}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password_confirmation}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row className="align-items-center mb-3">
                            <Col>
                                <Link
                                    href={route('login')}
                                    className="text-decoration-underline text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Маєте обліковий запис?
                                </Link>
                            </Col>
                            <Col className="text-end">
                                <div className="d-flex justify-content-end">
                                    <Button variant="danger" href='/' className="me-2">
                                        Відмінити
                                    </Button>
                                    <Button variant="primary" type="submit" disabled={processing}>
                                        Зареєструватися
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
