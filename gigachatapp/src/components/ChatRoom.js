import MessageContainer from "./MessageContainer";
import { Col, Row } from "react-bootstrap";

const ChatRoom = ({msgs}) => <div>
    <Row className="px-5 py-5">
        <Col sm={10}>
            <h2>
                Chatroom
            </h2>
        </Col>
        <Col>

        </Col>
    </Row>
    <Row className="px-5 py-5">
        <Col sm={12}>
            <MessageContainer messages={msgs}/>
        </Col>
    </Row>
</div>

export default ChatRoom;