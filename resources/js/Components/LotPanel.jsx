import { Container, Dropdown, DropdownButton, Image } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";

export default function LotPanel({lot}){
    return (
        <Container>
            <Image src={''}></Image>
            <h3>
                {'Дата завешення'}
            </h3>
            <DropdownButton variant="light" title={<ThreeDots/>}>
                <Dropdown.Item href={`/user-lots//edit`}>
                    Редагувати
                </Dropdown.Item>
                <Dropdown.Item href="">
                    Видалити
                </Dropdown.Item>
            </DropdownButton>
        </Container>
    );
}