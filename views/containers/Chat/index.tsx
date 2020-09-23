import React, { useEffect, useState } from 'react';
import socketService from '../../../domain/socket /service';
import moment from 'moment';
import { INCOMING_MESSAGE, SERVER_MESSAGE } from '../../../domain/socket /redux/actions';

import { Input, Button, Comment, Avatar, List, Row, Col, message as antMessage, notification } from 'antd';
import { UserModel } from '../../../domain/user/model';
import '../../styles/containers/chat.less';
import liveStreamService from '../../../domain/liveStream/service';

const { TextArea } = Input;

interface ChatInterface {
  roomId: string;
  userData: UserModel;
  loading?: boolean;
  isFullScreen: boolean;
}

interface MessageInterface {
  name: string;
  message: string;
  date: string;
}

const Chat: React.FC<ChatInterface> = ({ roomId, userData, isFullScreen }) => {

  const { enterLiveRoom, sendMessageToRoom } = liveStreamService();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([] as Array<MessageInterface>);
  const [isSubmittingMessage, setSubmittingMessage] = useState(false);

  useEffect(() => {
    const { socket } = socketService();
    socket.on(INCOMING_MESSAGE, (message: MessageInterface) => {
      setMessages(messages => [message, ...messages])
    })
    socket.on(SERVER_MESSAGE, (info: string) => {
      showNewJoiner(info)
    })
    initEnterLiveRoom()
    return (() => {
      socket.emit('disconnect');
    })
  }, [roomId]);

  const initEnterLiveRoom = async () => {
    try {
      await enterLiveRoom(userData.username, roomId);
    } catch (e) {
      //do nothing
    }
  }

  const showNewJoiner = (name) => {
    notification.info({
      message: `${name} has joined the room`,
      placement: 'bottomLeft',
      duration: 1000
    })
  }

  const sendMessage = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (message) {
      try {
        setSubmittingMessage(true)
        const { } = await sendMessageToRoom({ message, name: userData.username, room: roomId, date: new Date().toISOString() })
        setMessage('');
      } catch (e) {
        antMessage.error('Cannot send message');
      } finally {
        setSubmittingMessage(false)
      }
    }
  }

  const CommentList = () => (
    <div className="videochat-container">
      <List
        dataSource={messages}
        itemLayout="horizontal"
        renderItem={(props, idx) =>

          <Comment
            key={props.date + idx}
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
            <Col span={19}>
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
                loading={isSubmittingMessage}
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