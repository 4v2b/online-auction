import { router } from '@inertiajs/react';

import { Container, Dropdown, DropdownButton, Image, Row, Col } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";

export default function LotPanel({ lot }) {

    function handleDelete() {
        router.delete(`/lots/${lot.id}`);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h4>
                        {lot.title}
                    </h4>
                    <div>
                        {lot.description}
                    </div>
                </Col>
                <Col>
                    <Image src={''}></Image>
                    <span>
                        Створено: {lot.ends_at}
                    </span>
                    <span>
                        Дата закриття:{lot.ends_at}
                    </span>

                    <DropdownButton variant="light" title={<ThreeDots />}>
                        <Dropdown.Item href={`/lots/${lot.id}/edit`}>
                            Редагувати
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleDelete}>
                            Видалити
                        </Dropdown.Item>
                    </DropdownButton>

                </Col>
            </Row>

        </Container>
    );
}