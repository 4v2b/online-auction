import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { router } from '@inertiajs/react'
import Navbar from "@/Components/Navbar";

//Todo add expiration date of lot in form
//Todo (optional) remake page using useForm from Inertia

export default function CreateLot({ categories }) {
    const [values, setValues] = useState({
        lotName: "",
        lotDesc: "",
        photos: [],
        startBid: "",
        selectedCategories: [],
        tradeEndTime: ''
    });

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setValues({ ...values, selectedCategories: [...values.selectedCategories, value] });
        } else {
            setValues({ ...values, selectedCategories: values.selectedCategories.filter(cat => cat !== value) });
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

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues({ ...values, [key]: value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        router.post('/user-lots', values);
    };

    return (
        <>
            <Navbar auth={{ user: true }} categories={categories}></Navbar>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="lotName" className="mb-3">
                    <Form.Label>Назва лоту</Form.Label>
                    <Form.Control type="text" value={values.lotName} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="lotDesc" className="mb-3">
                    <Form.Label>Опис лоту</Form.Label>
                    <Form.Control as="textarea" rows={3} value={values.lotDesc} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="photos" className="mb-3">
                    <Form.Label>Фото лоту</Form.Label>
                    <Form.Control type="file" multiple />
                </Form.Group>
                <Form.Group controlId="tradeEndTime">
                    <Form.Label>Дата та час завершення торгів</Form.Label>
                    <Form.Control type="datetime-local" value={values.tradeEndTime} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="startBid" className="mb-3">
                    <Form.Label>Початкова ставка</Form.Label>
                    <Form.Control type="text" value={values.startBid} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="categories">
                    <Form.Label>Оберіть категорії для лоту:</Form.Label>
                    {formCategoriesGroup}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Опублікувати
                </Button>
            </Form>
        </>
    );
}