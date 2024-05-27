import { Form, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import {Search} from 'react-bootstrap-icons';
import { router } from '@inertiajs/react';

export default function SearchBar({ categories }) {
    const categoryList = categories.map((el) => (
        <Dropdown.Item key={el.id} href={`/categories/${el.id}`}>
            {el.name}
        </Dropdown.Item>
    ));

    function handleSubmit(event){
        event.preventDefault();
        const searchString = event.target.elements.search.value;
        router.post('/catalog/search', {searchString: searchString});
    }

    return (
        <div className="d-flex align-items-center">
            <Form onSubmit={handleSubmit} className="d-flex me-5">
                <FormControl
                    type="search"
                    placeholder="Знайти"
                    name='search'
                    className="me-4"
                    aria-label="Search"
                    maxLength={40}
                />
                <Button variant="outline-success" type='submit'>
                    <Search/>
                </Button>
            </Form>
            <DropdownButton variant="secondary" title="Категорії">
                {categoryList}
            </DropdownButton>
        </div>
    );
}