'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Message, Payload } from '../../models/message';
import { Profile } from '@/models/profile';
import { BiSend } from 'react-icons/bi';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useAppSelector } from '@/redux/hooks';
import { RiEmojiStickerLine } from 'react-icons/ri';
import { BsEmojiSmile } from 'react-icons/bs';
import { over, Client } from 'stompjs';
import SockJS from 'sockjs-client';

const Chatroom = () => {
  // Redux store
  const sessionProfile: Profile = useAppSelector(
    (state) => state.profileReducer.sessionProfile
  );

  const [stompClient, setStompClient] = useState<Client>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [privateChats, setPrivateChats] = useState(new Map());

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';
  const wsEndpoint = process.env.NEXT_PUBLIC_WS_ENDPOINT ?? '';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onMessageReceived = (payload: any) => {
    const payloadData = JSON.parse(payload.body);

    switch (payloadData.status) {
      case 'JOIN':
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case 'MESSAGE':
        const messagePayload: Message = {
          messageId: 1,
          senderProfileId: payloadData.senderProfileId,
          receiverProfileId: payloadData.receiverProfileId,
          text: payloadData.text,
          sentDatetime: '',
          isRead: false,
        };
        // messages.push(messagePayload);
        console.log(messages);
        setMessages((prevMessages) => [...prevMessages, messagePayload]);
        console.log(messages);
        break;
    }
  };

  useEffect(() => {
    let client: Client;
    console.log('session profile ', sessionProfile);
    const onConnected = () => {
      console.log('Connected!');
      client?.subscribe('/chatroom/public', onMessageReceived);
      setStompClient(client);
      console.log('stomp client : ', stompClient);
    };

    const onError = (err: any) => {
      console.log(err);
    };

    const Sock = new SockJS(`${wsEndpoint}/ws`);
    client = over(Sock);
    client.connect({}, onConnected, onError);
    // Clean up function to disconnect WebSocket when component unmounts
    return () => {
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log('User disconnected');
        });
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('stompClient : ', stompClient);
    // Add the message to the messages array
    // setMessages([...messages, { text: inputValue, profileId: 1 }]);
    if (stompClient) {
      const chatMessage = {
        senderProfileId: +sessionProfile.profileId,
        receiverProfileId: 2,
        text: inputValue,
        status: 'MESSAGE',
      };
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
      setInputValue('');
    } else {
      console.log('Stomp Client is null');
    }
    // Clear the input field
    setInputValue('');
  };

  return (
    <div className='my-4 flex h-[92%] w-[77.5dvw] flex-col items-center justify-start'>
      {/* User info section */}
      <div className='flex w-full items-center rounded-t-xl border-b bg-white p-4'>
        <div className='h-10 w-10 rounded-full bg-gray-300'></div>
        <span className='ml-2 font-bold'>{sessionProfile?.displayName}</span>
      </div>

      {/* Chat messages section */}
      <div className='w-full  flex-1 overflow-y-auto bg-white p-4'>
        {messages.map((message: Message, index) => {
          const nextMessage = messages[index + 1];
          const hasSameProfileId =
            nextMessage &&
            +nextMessage.senderProfileId === +message.senderProfileId;

          return (
            <div
              key={index}
              className={`${hasSameProfileId ? 'mb-0.5' : 'mb-3'}  flex ${
                +message.senderProfileId === +sessionProfile.profileId
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`${
                  +message.senderProfileId === +sessionProfile.profileId
                    ? 'rounded-l-3xl rounded-r-lg  bg-primary text-white'
                    : 'rounded-l-lg rounded-r-3xl  bg-secondary text-black'
                } max-w-lg break-words px-4 py-2`}
              >
                {message.text}
              </div>
            </div>
          );
        })}
        {/* Dummy div for scrolling to bottom */}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Text input and emoji picker section */}
      <form
        onSubmit={handleSubmit}
        className='relative flex w-full  items-center rounded-b-xl border-t bg-white p-4'
      >
        {showEmojiPicker && (
          <div className='absolute left-4 top-[-460px] bg-transparent text-white'>
            <EmojiPicker
              onEmojiClick={(e: EmojiClickData) =>
                setInputValue(inputValue + e.emoji)
              }
            />
          </div>
        )}

        <button
          type='button'
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={`mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 `}
        >
          {showEmojiPicker ? (
            <RiEmojiStickerLine className='h-full w-full text-secondary' />
          ) : (
            <BsEmojiSmile className='h-[80%] w-[80%]' />
          )}
        </button>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Type your message...'
          className='mr-2 flex-1 rounded-full bg-gray-100 px-4 py-2 focus:outline-none'
        />

        <button
          type='submit'
          className='ml-2 h-full rounded-full bg-primary px-4 py-2 text-white transition-all
           duration-200 ease-linear hover:bg-secondary'
        >
          <BiSend className='h-full w-full' />
        </button>
      </form>
    </div>
  );
};

export default Chatroom;
