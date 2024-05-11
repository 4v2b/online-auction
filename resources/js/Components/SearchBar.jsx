import { DropdownButton } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
export default function SearchBar({ categories }) {

    const categoryList = categories.map(el => {
        return (<Dropdown.Item href={`/category/${el.id}`}>{el.name}</Dropdown.Item>)
    });

    return (
        <div className='d-flex'>
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Знайти" aria-label="Search"></input>
                <button className="btn btn-outline-success" type="submit">Пошук</button>
            </form>

            <DropdownButton variant='secondary' title='Категорії'>
                {categoryList}
            </DropdownButton>
        </div>
    );
}