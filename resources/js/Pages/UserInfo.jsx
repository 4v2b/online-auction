import { router, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Container, FloatingLabel } from "react-bootstrap";
import MenuLayout from "@/Layouts/MenuLayout";
import { Head } from '@inertiajs/react';

export default function UserInfo({ name, avatar, contacts, contactTypes }) {
    const { data, setData, post, errors } = useForm({
        name: name,
        avatar: null,
        contacts: contacts
    });
    const [preview, setPreview] = useState(avatar || undefined);

    useEffect(() => {
        if (!data.avatar && !avatar) {
            setPreview(undefined);
            return;
        }
        if (!data.avatar) {
            return;
        }
        const objectUrl = URL.createObjectURL(data.avatar);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [data.avatar]);

    const handleFileChange = (e) => {
        setData('avatar', e.target.files[0]);
    };

    const handleContactChange = (id, field, value) => {
        setData('contacts', data.contacts.map(contact =>
            contact.id === id ? { ...contact, [field]: value } : contact));
    };

    const addContact = () => {
        setData('contacts',
            [
                ...data.contacts,
                {
                    id: `${-1 * Date.now()}`,
                    value: '',
                    contact_type_id: contactTypes[0].id
                }
            ]
        );
    };

    const removeContact = (id) => {
        setData('contacts', data.contacts.filter(contact => contact.id !== id));
    };

    function handleSubmit(e) {
        e.preventDefault();
        post('/userinfo');
    }

    return (
        <MenuLayout>
            <Head title="Контактні дані" />
            <Container>
                <h2 className="my-4">Контактні дані</h2>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={8}>
                            <Card className="mb-5">
                                <Card.Body>
                                    <Form.Group controlId="name">
                                        <Form.Label>Ім'я користувача</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            isInvalid={!!errors.name}
                                        />
                                        {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                                    </Form.Group>
                                </Card.Body>
                            </Card>

                            <Card className="mb-4">
                                <Card.Body>
                                    <Form.Label>Контакти</Form.Label>
                                    {data.contacts.map((contact, index) => (
                                        <Row key={contact.id} className="mb-3">
                                            <Col md={4}>
                                                <Form.Group controlId={`contact-value-${contact.id}`}>
                                                    <FloatingLabel
                                                        label="Значення">
                                                        <Form.Control
                                                            type="text"
                                                            value={contact.value}
                                                            onChange={(e) => handleContactChange(contact.id, 'value', e.target.value)}
                                                            isInvalid={!!errors[`contacts.${index}.value`]}
                                                        />

                                                    </FloatingLabel>
                                                    {errors[`contacts.${index}.value`] && <Form.Control.Feedback type="invalid">{errors[`contacts.${index}.value`]}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group controlId={`contact-type-${contact.id}`}>
                                                    <FloatingLabel
                                                        label="Тип контакту">

                                                        <Form.Control
                                                            as="select"
                                                            value={contact.contact_type_id}
                                                            onChange={(e) => handleContactChange(contact.id, 'contact_type_id', e.target.value)}
                                                            isInvalid={!!errors[`contacts.${index}.contact_type_id`]}
                                                        >
                                                            {contactTypes.map(type => (
                                                                <option key={type.id} value={type.id}>
                                                                    {type.name}
                                                                </option>
                                                            ))}
                                                        </Form.Control></FloatingLabel>
                                                    {errors[`contacts.${index}.contact_type_id`] && <Form.Control.Feedback type="invalid">{errors[`contacts.${index}.contact_type_id`]}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>
                                            <Col md={2} className="d-flex align-items-end">
                                                <Button variant="danger" onClick={() => removeContact(contact.id)}>Видалити</Button>
                                            </Col>
                                        </Row>
                                    ))}
                                    <br />
                                    <Button variant="primary" onClick={addContact}>Додати контакт</Button>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <Card.Img width={100} variant="top" src={preview} alt="profile picture" />
                                <Card.Body>
                                    <Form.Group controlId="avatar">
                                        <Form.Label>Фото профілю</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="avatar"
                                            onChange={handleFileChange}
                                            isInvalid={!!errors.avatar}
                                        />
                                        {errors.avatar && <Form.Control.Feedback type="invalid">{errors.avatar}</Form.Control.Feedback>}
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Button className="mt-4" variant="success" type="submit">Зберегти зміни</Button>
                </Form>
            </Container>
        </MenuLayout>
    );
}
