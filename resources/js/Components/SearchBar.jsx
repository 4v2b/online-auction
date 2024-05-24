import { Form, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import {Search} from 'react-bootstrap-icons'

export default function SearchBar({ categories }) {
    const categoryList = categories.map((el) => (
        <Dropdown.Item key={el.id} href={`/category/${el.id}`}>
            {el.name}
        </Dropdown.Item>
    ));

    function handleSubmit(){

    }

    return (
        <div className="d-flex align-items-center">
            <Form className="d-flex me-3">
                <FormControl
                    type="search"
                    placeholder="Знайти"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success" onClick={handleSubmit}>
                    <Search/>
                </Button>
            </Form>
            <DropdownButton variant="secondary" title="Категорії">
                {categoryList}
            </DropdownButton>
        </div>
    );
}