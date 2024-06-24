import { Col, Row, Button, Form } from "react-bootstrap";
import { useState } from "react";

const WaitingRoom = ({ joinChatRoom }) => {
    const[user, setUsername] = useState();
    const[chatroom, setChatRoom] = useState();

    return <Form onSubmit={ e => {
        e.preventDefault();
        joinChatRoom(user, chatroom);
    }}>

        <Row className="px-5 py-5">
            <Col sm={12}>
                <Form.Group>
                    <Form.Control placeholder="Username" onChange={ e => setUsername(e.target.value) }/>

                    <Form.Control placeholder="Chatroom" onChange={ e => setChatRoom(e.target.value) }/>
                </Form.Group>
            </Col>
            <Col sm={12}>
                <hr />
                <Button variant='success' type='submit'>Join</Button>
            </Col>
        </Row>

    </Form>
}

export default WaitingRoom;