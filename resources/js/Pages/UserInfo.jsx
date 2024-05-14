import { router } from "@inertiajs/react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Contacts from "@/Components/ContactsForm";

export default function UserInfo({ person, contacts, contactTypes }) {
    const [values, setValues] = useState({
        name: person.name,
        contacts: contacts
    });
    //const [contacts, setContacts] = useState([]);
    const [username, setUsername] = useState(person.name);

    //Todo pass stored contacts in ContactForms as 

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues({ ...values, [key]: value });
    };

    function handleAddContact () {
        setContacts([...contacts, { type: '', value: '' }]);
    };

    function handleContactChange (id, type_id, value) {
        const updatedContacts = [...contacts];
        updatedContacts[index][key] = value;
        setContacts(updatedContacts);
    };

    function handleContactRemove (id){
        const updatedContacts = [...contacts];
        updatedContacts.splice(index, 1);
        setContacts(updatedContacts);
    };

    function handleSubmit(e){
        e.preventDefault();
        router.post('/userinfo', values);
    }

    return (
        <>
            <h2>Контактні дані</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>
                        Ім'я користувача
                    </Form.Label>
                    <Form.Control onChange={handleChange} type="text">{username}</Form.Control>
                </Form.Group>
            //Todo making avatar
                <Contacts></Contacts>
                <Button variant="danger" type='submit'>
                    Зберегти зміни
                </Button>
            </Form>
        </>
    );
}