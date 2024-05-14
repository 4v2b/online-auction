import { TrashFill } from "react-bootstrap-icons"

export default function Contacts(
    { types, onContactRemove, onContactChange, onAddContact, children }) {

    const typesSelect = types.map(
        el => {
            return (
                <Form.Select onChange={(e) =>
                    onContactChange(index, 'type', e.target.value)}>
                    <option value={el.id}>{el.name}</option>
                </Form.Select>
            );
        }
    );

    return (
        <Form>
            {children}
            {contacts.map((contact, index) => (
                <Row key={index}>
                    <Col>
                        <Form.Group controlId={`contactType-${index}`}>
                            <Form.Label>Contact Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={contact.type}
                                onChange={(e) =>
                                    onContactChange(index, 'type', e.target.value)
                                }
                            >
                                {contactTypes.map((type, typeIndex) => (
                                    <option key={typeIndex} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={`contactValue-${index}`}>
                            <Form.Label>Contact Value</Form.Label>
                            <Form.Control
                                type="text"
                                value={contact.value}
                                onChange={(e) =>
                                    onContactChange(index, 'value', e.target.value)
                                }
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button
                            variant="danger"
                            onClick={() => onContactRemove(index)}
                        >

                        </Button>
                    </Col>
                </Row>
            ))}
            <Button variant="primary" onClick={onAddContact}>
               Додати контакт
            </Button>
        </Form>
    );

} 