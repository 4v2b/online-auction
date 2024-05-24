import { router } from "@inertiajs/react";
import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Contacts from "@/Components/ContactsForm";
import MenuLayout from "@/Layouts/MenuLayout";

export default function UserInfo({ person, contacts, contactTypes }) {
    const [values, setValues] = useState({
        name: person.name,
        avatar: person.profile_picture,
        contacts: contacts,
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues({ ...values, [key]: value });
    };

    const handleFileChange = (e) => {
        setValues({
            ...values,
            avatar: e.target.files[0],
        });
    };

    const handleContactChange = (id, field, value) => {
        setValues({
            ...values,
            contacts: values.contacts.map(contact =>
                contact.id === id ? { ...contact, [field]: value } : contact
            ),
        });
    };

    const addContact = () => {
        setValues({
            ...values,
            contacts: [...values.contacts, { id: `${-1*Date.now()}`, value: '', contact_type_id: contactTypes[0].id }],
        });
    };

    const removeContact = (id) => {
        setValues({
            ...values,
            contacts: values.contacts.filter(contact => contact.id !== id),
        });
    };

    function handleSubmit(e){
        e.preventDefault();
        router.post('/userinfo', values);
    }

    return (
        <MenuLayout>
            <h2>Контактні дані</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>
                        Ім'я користувача
                    </Form.Label>
                    <Form.Control onChange={handleChange} type="text">{values.name}</Form.Control>
                </Form.Group>

                <Form.Group controlId="avatar">
                    <Form.Label>Аватар</Form.Label>
                    <Form.Control
                        type="file"
                        name="avatar"
                        onChange={handleFileChange}
                    />
                </Form.Group>

                {values.contacts.map((contact, index) => (
                    <Row key={contact.id} className="mb-3">
                        <Col md={5}>
                            <Form.Group controlId={`contact-value-${contact.id}`}>
                                <Form.Label>Контакт</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={contact.value}
                                    onChange={(e) => handleContactChange(contact.id, 'value', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={5}>
                            <Form.Group controlId={`contact-type-${contact.id}`}>
                                <Form.Label>Тип контакту</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={contact.contact_type_id}
                                    onChange={(e) => handleContactChange(contact.id, 'contact_type_id', e.target.value)}
                                >
                                    {contactTypes.map(type => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={2} className="d-flex align-items-end">
                            <Button variant="danger" onClick={() => removeContact(contact.id)}>Видалити</Button>
                        </Col>
                    </Row>
                ))}
                
                <Button variant="primary" onClick={addContact}>Додати контакт</Button>
                <Button variant="danger" type='submit'>
                    Зберегти зміни
                </Button>
            </Form>
        </MenuLayout>
    );
}