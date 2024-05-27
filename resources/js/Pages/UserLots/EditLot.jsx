import MenuLayout from '@/Layouts/MenuLayout';
import PhotoUpload from '@/Components/PhotoUpload';
import { router, useForm } from '@inertiajs/react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from "react";

export default function EditLot({ lot, storedPhotos }) {
    const { data, setData, post, errors } = useForm(
        {
            lotName: lot.title,
            lotDesc: lot.description,
            deletedStoredPhotos: [],
            photos: [],
            _method: 'patch'
        }
    );
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (data.photos.length < 1 && storedPhotos.length < 1) {
            setPreviews([]);
            return;
        }
        const filteredUploadedPhoto = storedPhotos
            .filter(photo => data.deletedStoredPhotos.indexOf(photo.id) === -1)
            .map(el => el.url);

        let objectUrls = [];
        objectUrls = [...data?.photos.map(file => URL.createObjectURL(file)), ...filteredUploadedPhoto];
        setPreviews(objectUrls);

        return () => objectUrls.forEach(objectUrl => URL.revokeObjectURL(objectUrl));
    }, [data.photos, storedPhotos, data.deletedStoredPhotos]);

    console.log(errors);

    function handleSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setData('photos', [...data.photos, e.target.files[0]]);
        }
    }

    function handlePhotoRemove(deleteIndex) {

        const url = previews.at(deleteIndex);
        const photo = storedPhotos.find((photo) => photo.url == url);

        if (photo) {
            setData('deletedStoredPhotos', [...data.deletedStoredPhotos, photo.id]);
            return;
        }

        console.log(url);

        const filteredPhotos = storedPhotos.map(el => el.url);
        const filteredPreviews = previews.filter(el => filteredPhotos.indexOf(el) === -1);
        const editedIndex = filteredPreviews.indexOf(url);
        const keptFiles = data.photos.filter((file, index) => index !== editedIndex);

        setData('photos', keptFiles);
    }

    function handleDelete() {
        router.delete(`/lots/${lot.id}`);
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(`/lots/${lot.id}`, {
            method: 'patch'
        })
    }

    return (
        <MenuLayout>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="lotName" className="mb-3">
                        <Form.Label>Заголовок лоту</Form.Label>
                        <Form.Control type="text" value={data.lotName} onChange={(e) => setData('lotName', e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="lotDesc" className="mb-3">
                        <Form.Label>Опис лоту</Form.Label>
                        <Form.Control as="textarea" rows={3} value={data.lotDesc} onChange={(e) => setData('lotDesc', e.target.value)} />
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

                <Button variant='danger' onClick={handleDelete}>Видалити лот</Button>
            </Row>
        </MenuLayout>
    );
}