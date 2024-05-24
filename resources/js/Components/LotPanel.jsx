import { router } from '@inertiajs/react';

import { Container, Dropdown, DropdownButton, Image } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";

export default function LotPanel({lot}){

    function handleDelete(){
        router.delete('lot.destroy', {id: lot.id});
    }

    return (
        <Container>
            <Image src={''}></Image>
            <h3>
                {lot.ends_at}
            </h3>
            <h3>
                {lot.start_price}
            </h3>
            <DropdownButton variant="light" title={<ThreeDots/>}>
                <Dropdown.Item href={`/user-lots/edit`}>
                    Редагувати
                </Dropdown.Item>
                <Dropdown.Item onClick={handleDelete}>
                    Видалити
                </Dropdown.Item>
            </DropdownButton>
        </Container>
    );
}