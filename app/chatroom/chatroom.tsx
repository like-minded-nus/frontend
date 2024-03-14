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
import { useSearchParams } from 'next/navigation';

const Chatroom = () => {
  // Redux store
  const sessionProfile: Profile = useAppSelector(
    (state) => state.profileReducer.sessionProfile
  );
  const searchParams = useSearchParams();

  const receiverProfileId = searchParams.get('receiverProfileId') ?? '0';

  const [stompClient, setStompClient] = useState<Client>();
  const [messages, setMessages] = useState<Map<string, Message[]>>(new Map());
  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [receiverProfile, setReceiverProfile] = useState<Profile>();

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
    const fetchData = async () => {
      try {
        const res = await fetch(`${endpoint}/profile/${receiverProfileId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        // Process the response here
        if (res.ok) {
          const userProfileData = await res.json();
          setReceiverProfile(userProfileData.payload);
        } else {
          throw new Error('Failed to fetch receiver profile');
        }
      } catch (error) {
        console.error('Error fetching receiver profile:', error);
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array means this effect runs only once on mount

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onPrivateMessage = (payload: any) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);

    const messagePayload: Message = {
      messageId: 1,
      senderProfileId: payloadData.senderProfileId,
      receiverProfileId: payloadData.receiverProfileId,
      text: payloadData.text,
      sentDatetime: '',
      isRead: false,
    };

    //   setMessages((prevMessages) => [...prevMessages, messagePayload]);
    if (+receiverProfileId === +messagePayload.senderProfileId) {
      console.log('A');
      if (!messages.has(receiverProfileId)) {
        console.log('B');
        messages.set(receiverProfileId, [messagePayload]);
        setMessages(new Map(messages));
      } else {
        const existingMessages = messages.get(receiverProfileId);
        if (existingMessages) {
          existingMessages.push(messagePayload);
          messages.set(receiverProfileId, existingMessages);
          setMessages(new Map(messages));
        }
      }
    }
  };

  useEffect(() => {
    let client: Client;
    const onConnected = () => {
      console.log('Connected!');
      client?.subscribe(
        '/user/' + sessionProfile.profileId + '/private',
        onPrivateMessage
      );
      setStompClient(client);
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
      const messagePayload: Message = {
        messageId: 1,
        senderProfileId: +sessionProfile.profileId,
        receiverProfileId: +receiverProfileId,
        text: inputValue,
        sentDatetime: '',
        isRead: false,
      };

      if (!messages.has(receiverProfileId)) {
        messages.set(receiverProfileId, [messagePayload]);
        setMessages(new Map(messages));
      } else {
        const existingMessages = messages.get(receiverProfileId);
        if (existingMessages) {
          existingMessages.push(messagePayload);
          messages.set(receiverProfileId, existingMessages);
          setMessages(new Map(messages));
        }
      }

      stompClient.send(
        '/app/private-message',
        {},
        JSON.stringify(messagePayload)
      );
      setInputValue('');
      setShowEmojiPicker(false);
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
        <span className='ml-2 font-bold'>{receiverProfile?.displayName}</span>
      </div>

      {/* Chat messages section */}
      <div className='w-full  flex-1 overflow-y-auto bg-white p-4'>
        {messages.get(receiverProfileId)?.map((message: Message, index) => {
          const nextMessage = messages.get(receiverProfileId)?.[index + 1];
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
