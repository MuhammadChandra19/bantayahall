import React, { useEffect, useState } from 'react';
import socketService from '../../../domain/socket /service';
import moment from 'moment';
import { ENTER_LIVE_ROOM, INCOMING_MESSAGE, SEND_MESSAGE } from '../../../domain/socket /redux/actions';

import { Input, Button, Comment, Avatar, List, Row, Col } from 'antd';
import { UserModel } from '../../../domain/user/model';
import ScrollToBottom from 'react-scroll-to-bottom';
import '../../styles/containers/chat.less';

const { TextArea } = Input;

interface ChatInterface {
  roomId: string;
  userData: UserModel;
  loading?: boolean
}

interface MessageInterface {
  name: string;
  message: string;
  date: string;
}

const Chat: React.FC<ChatInterface> = ({ roomId, userData, loading }) => {
  const { socket } = socketService();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([] as Array<MessageInterface>);

  useEffect(() => {
    socket.emit(ENTER_LIVE_ROOM, { name: userData.username, room: roomId })
    socket.on(INCOMING_MESSAGE, (message: MessageInterface) => {
      setMessages(messages => [message, ...messages])
    })
    return (() => {
      socket.emit('disconnect');
    })
  }, [roomId]);



  // useEffect(() => {
  //   socket.on(INCOMING_MESSAGE, (message: MessageInterface) => {
  //     setMessages([...messages, message])
  //   })
  // }, []);

  const sendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (message) {
      socket.emit(SEND_MESSAGE, { message, name: userData.username, room: roomId, date: new Date().toISOString() });

      setMessage('');
    }
  }

  const CommentList = () => (
    <div className="videochat-container">
      <List
        dataSource={messages}
        itemLayout="horizontal"
        renderItem={(props, idx) =>

          <Comment
            key={props.date}
            author={<p style={{ color: 'white', marginBottom: 0 }}>{props.name}</p>}
            avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            content={<p style={{ color: 'white' }}>{props.message}</p>}
            datetime={moment(props.date).fromNow()}
          />

        }
      />
    </div>

  )

  return (
    <>

      <Comment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <Row>
            <Col span={20}>
              <Input
                onChange={({ target: { value } }) => setMessage(value)}
                value={message}
              />
            </Col>
            <Col span={4}>
              <Button
                htmlType="submit"
                onClick={e => sendMessage(e as unknown as React.KeyboardEvent<HTMLInputElement>)}
                type="primary"
              >
                Add Comment
              </Button>
            </Col>
          </Row>
        }

      />
      {messages.length > 0 && <CommentList />}

    </>

  );
};

export default Chat;