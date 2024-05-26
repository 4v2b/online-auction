import MenuLayout from '@/Layouts/MenuLayout';
import PhotoUpload from '@/Components/PhotoUpload';
import { router,  useForm } from '@inertiajs/react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from "react";

export default function EditLot({ lot, photos }) {
    const { data, setData, post, errors } = useForm(
        {
            lotName: lot.name,
            lotDesc: lot.description,
            photoUrls: photos,
            photos: [],
            _method: 'put'
        }
    );
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (data.photos.length < 1 && data.photoUrls.length < 1) {
            setPreviews([]);
            return;
        }

        let objectUrls = [];
        objectUrls =  [...data?.photos.map(file => URL.createObjectURL(file)), ...data.photoUrls];
        setPreviews(objectUrls);

        return () => objectUrls.forEach(objectUrl => URL.revokeObjectURL(objectUrl));
    }, [data.photos]);

    function handleSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setData('photos', [...data.photos, e.target.files[0]]);
        }
    }

    function handlePhotoRemove(deleteIndex) {
        const keptFiles = data.photos.filter((file, index) => index !== deleteIndex);
        setData('photos', keptFiles);
    }

    function handleDelete() {
        router.delete(`/lots/${lot.id}`);
    }

    function handleSubmit() {

    }

    return (
        <MenuLayout>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="lotName" className="mb-3">
                        <Form.Label>Назва лоту</Form.Label>
                        <Form.Control type="text" value={data.lotName} onChange={(e)=>setData('lotName', e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="lotDesc" className="mb-3">
                        <Form.Label>Опис лоту</Form.Label>
                        <Form.Control as="textarea" rows={3} value={data.lotDesc} onChange={(e)=>setData('lotDesc', e.target.value)}  />
                    </Form.Group>

                    <Form.Group controlId="avatar">
                        <Form.Label>Фото</Form.Label>
                        <PhotoUpload
                            previews={previews}
                            onRemove={handlePhotoRemove}
                            onSelectFile={handleSelectFile}
                        />

                    </Form.Group>
                    <Button type='submit'>Зберегти зміни</Button>
                </Form>

                <Button onClick={handleDelete}>Видалити</Button>
            </Row>
        </MenuLayout>
    );
}