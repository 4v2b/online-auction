import { Container, Row, Col, Image, Button, Card } from "react-bootstrap";
import { Trash } from 'react-bootstrap-icons';

export default function ImageUpload({ previews, onSelectFile, onRemove }) {


    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col>
                    <input type='file' onChange={onSelectFile} className="form-control" />
                </Col>
            </Row>
                <Row className="preview-section p-3 border rounded">
                    {previews.map((preview, index) => (
                        <Col key={index} md={4} className="mb-3 position-relative">
                            <Button 
                                variant="light" 
                                size="sm" 
                                onClick={() => onRemove(index)} 
                                className="position-absolute top-5 end-5 translate-middle badge round bg-dark"
                                style={{ zIndex: 1, border: 'none' }}
                            >
                                <Trash size={12} />
                            </Button>
                            <Card>
                                <Card.Img variant="top" src={preview} />
                            </Card>
                        </Col>
                    ))}
                </Row>
        </Container>
    );
}
