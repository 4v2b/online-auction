import MainLayout from '@/Layouts/MainLayout';
import { useForm } from '@inertiajs/react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

export { Row } from 'react-bootstrap';

export default function EditLot({ lot, photos }) {
    const {data, setData, post, errors} = useForm(
        {
            lotName: lot.name,
            lotDesc: lot.description,
            photos: photos,
            deletedPhotos: [],
            newPhotos: [],
            _method: 'put'
        }
    )    
    const [deletedPhotos, setDeletedPhotos] = useState([]);
    const [newPhotos, setNewPhotos] = useState([]);

    function handleDelete() {
        router.delete(`/lots/${lot.id}`);
    }

    function handleSubmit(){

    }

    return (
        <MenuLayout>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="lotName" className="mb-3">
                        <Form.Label>Назва лоту</Form.Label>
                        <Form.Control type="text" value={values.lotName} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="lotDesc" className="mb-3">
                        <Form.Label>Опис лоту</Form.Label>
                        <Form.Control as="textarea" rows={3} value={values.lotDesc} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="avatar">
                        <Form.Label>Аватар</Form.Label>
                        <Form.Control
                            type="file"
                            name="avatar"
                            onChange={handleFileChange}
                        />
                    </Form.Group>
                    <Button type='submit'>Зберегти зміни</Button>
                </Form>

                <Button onClick={handleDelete}>Видалити</Button>
            </Row>
        </MenuLayout>
    );
}