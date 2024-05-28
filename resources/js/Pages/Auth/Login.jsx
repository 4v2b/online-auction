import { useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Head, Link, router, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100">
            <Head title="Log in" />

            <Row className="justify-content-center w-100">
                <Col md={6} lg={4}>
                    {status && <Alert variant="success" className="mb-4">{status}</Alert>}
                    <Form onSubmit={submit}>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Ел. пошта</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                isInvalid={!!errors.email}
                                autoFocus
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

                        <Form.Group controlId="remember" className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Запам'ятати мене"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                        </Form.Group>

                        <Row className="justify-content-between align-items-center">
                            <Col className="text-start">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-decoration-underline text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Забули пароль?
                                    </Link>
                                )}
                            </Col>
                            <Col className="text-end">
                                    <div className="d-flex justify-content-end">
                                        <Button variant="danger" href='/' className="me-2">
                                            Відмінити
                                        </Button>
                                        <Button variant="primary" type="submit" disabled={processing}>
                                            Ввійти
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
