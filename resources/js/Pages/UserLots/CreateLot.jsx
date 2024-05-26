import { Form, Button } from "react-bootstrap";
import MenuLayout from "@/Layouts/MenuLayout";
import { useForm, usePage } from '@inertiajs/react';
import PhotoUpload from '@/Components/PhotoUpload';
import {useState, useEffect} from 'react';

export default function CreateLot() {
    const { data, setData, post, errors } = useForm({
        lotName: "",
        lotDesc: "",
        photos: [],
        startBid: "",
        selectedCategories: [],
        tradeEndTime: '',
        _method: 'post'
    });
    const { categories } = usePage().props;
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (data.photos.length < 1) {
            setPreviews([]);
            return;
        }

        const objectUrls = data?.photos.map(file => URL.createObjectURL(file));
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


    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setData('selectedCategories', [...data.selectedCategories, value]);
        } else {
            setData('selectedCategories', data.selectedCategories.filter(cat => cat !== value));
        }
    };

    const formCategoriesGroup = categories?.map(el => {
        return (<Form.Check
            type="checkbox"
            id={el.id}
            label={el.name}
            value={el.id}
            onChange={handleCategoryChange}
        />);
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/user-lots', {
            forceFormData: true
        });
    };

    return (
        <MenuLayout>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="lotName" className="mb-3">
                    <Form.Label>Назва лоту {errors.lotName}</Form.Label>
                    <Form.Control type="text" value={data.lotName} onChange={e => setData('lotName', e.target.value)} />
                </Form.Group>
                <Form.Group controlId="lotDesc" className="mb-3">
                    <Form.Label>Опис лоту {errors.lotDesc}</Form.Label>
                    <Form.Control as="textarea" rows={3} value={data.lotDesc} onChange={e => setData('lotDesc', e.target.value)} />
                </Form.Group>
                <Form.Group controlId="photos" className="mb-3">
                    <Form.Label>Фото лоту {errors.photos}</Form.Label>
                    {/* <Form.Control type="file" onChange={e => setData('photos', e.target.files[0])} /> */}
                    <PhotoUpload
                        previews={previews}
                        onRemove={handlePhotoRemove}
                        onSelectFile={handleSelectFile}
                    ></PhotoUpload>
                </Form.Group>

                <Form.Group controlId="tradeEndTime">
                    <Form.Label>Дата та час завершення торгів {errors.tradeEndTime}</Form.Label>
                    <Form.Control type="datetime-local" value={data.tradeEndTime} onChange={e => setData('tradeEndTime', e.target.value)} />
                </Form.Group>
                <Form.Group controlId="startBid" className="mb-3">
                    <Form.Label>Початкова ставка {errors.startBid} </Form.Label>
                    <Form.Control type="text" value={data.startBid} onChange={e => setData('startBid', e.target.value)} />
                </Form.Group>
                <Form.Group controlId="categories">
                    <Form.Label>Оберіть категорії для лоту:</Form.Label>
                    {formCategoriesGroup}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Опублікувати
                </Button>
            </Form>
            {/* <PhotoUpload></PhotoUpload> */}
        </MenuLayout>
    );
}