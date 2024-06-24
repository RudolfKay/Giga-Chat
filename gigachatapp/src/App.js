import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import { Col, Row, Container } from 'react-bootstrap';
import WaitingRoom from './components/WaitingRoom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatRoom from './components/ChatRoom';
import { useState } from "react";
import './App.css';

function App() {
  const[messages, setMessages] = useState([]);
  const[conn, setConnection] = useState();

  const joinChatRoom = async (username, chatroom) => {
    try {
      //initiate connection
      const conn = new HubConnectionBuilder().withUrl("http://localhost:5006/chat")
                                             .configureLogging(LogLevel.Information)
                                             .build();
      // set up handler
      conn.on("JoinSpecificChat", (username, message) => {
        console.log("Alert: ", message)
      });

      conn.on("ReceiveSpecificMessage", (username, message) => {
        setMessages(messages => [...messages, {username, message}])
      })

      await conn.start();
      await conn.invoke("JoinSpecificChat", { username, chatroom});

      setConnection(conn);
    } 
    catch (error) 
    {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm='12'>
              <h1 className='font-weight-light'>
                Welcome to GigaChat!
              </h1>
              <h4 className='font-weight-light'>
                The toughest chat app in the world!
              </h4>
            </Col>
          </Row>
          {!conn
            ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
            : <ChatRoom msgs={messages}></ChatRoom>}
        </Container>
      </main>
    </div>
  );
}

export default App;
