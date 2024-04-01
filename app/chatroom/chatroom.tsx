'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Message, Payload } from '../../models/message';
import { Profile } from '@/models/profile';
import { BiSend, BiCheckDouble } from 'react-icons/bi';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useAppSelector } from '@/redux/hooks';
import { RiEmojiStickerLine } from 'react-icons/ri';
import { BsEmojiSmile } from 'react-icons/bs';
import { over, Client } from 'stompjs';
import SockJS from 'sockjs-client';
import { format } from 'date-fns';
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
    const fetchProfileData = async () => {
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

    const fetchMessageData = async () => {
      try {
        const res = await fetch(
          `${endpoint}/message/${sessionProfile.profileId}/${receiverProfileId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        // Process the response here
        if (res.ok) {
          const messageData = await res.json();
          messages.set(receiverProfileId, messageData.payload);
          setMessages(new Map(messages));
        } else {
          throw new Error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchProfileData();
    fetchMessageData();
  }, []); // Empty dependency array means this effect runs only once on mount

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onPrivateMessage = (payload: any) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);

    const messagePayload: Message = {
      messageId: payloadData.messageId,
      senderProfileId: payloadData.senderProfileId,
      receiverProfileId: payloadData.receiverProfileId,
      text: payloadData.text,
      sentDateTime: new Date(),
      isRead: 'N',
    };

    if (+receiverProfileId === +messagePayload.senderProfileId) {
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
    }
  };

  useEffect(() => {
    const sendMarkAsRead = (messageId: number, senderProfileId: number) => {
      const Sock = new SockJS(`${wsEndpoint}/ws`);
      let client = over(Sock);

      const messagePayload = {
        messageId,
        senderProfileId,
      };

      const onConnected = () => {
        console.log('Sending Yo!');
        client.send('/app/message-read', {}, JSON.stringify(messagePayload));
      };

      const onError = (err: any) => {
        console.log(err);
      };

      client.connect({}, onConnected, onError);
    };

    // Initialize IntersectionObserver when messages are loaded
    const initIntersectionObserver = () => {
      console.log('reinit');
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Change this threshold as needed
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.getAttribute('data-message-id');
            const senderProfileId =
              entry.target.getAttribute('sender-profile-id');

            console.log('After reinit apa ');
            console.log('message id ', messageId);
            console.log('sewnderProfile id ', senderProfileId);

            if (messageId && senderProfileId === receiverProfileId) {
              sendMarkAsRead(parseInt(messageId), parseInt(senderProfileId));
            }
          }
        });
      }, options);

      // Observe each message element
      document.querySelectorAll('.message').forEach((message) => {
        observer.observe(message);
      });

      // Clean up function to disconnect the observer when component unmounts
      return () => {
        observer.disconnect();
      };
    };

    initIntersectionObserver();
  }, [messages]);

  useEffect(() => {
    let client: Client;
    const onConnected = () => {
      console.log('Connected!');
      client?.subscribe(
        '/user/' + sessionProfile.profileId + '/private',
        onPrivateMessage
      );

      client?.subscribe(
        '/user/' + sessionProfile.profileId + '/private/read',
        handleMarkAsRead
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

  const handleMarkAsRead = (payload: any) => {
    console.log('Message with ID ', payload.body, ' is read yo');
    var payloadData = payload.body;
    const curMessages = messages.get(receiverProfileId);
    console.log('curMessages: ', curMessages);
    const messageIdIndex = curMessages?.findIndex((message) => {
      console.log('final 1', message.messageId);
      console.log('final 2', payloadData);
      return +message.messageId == +payloadData;
    });

    if (curMessages && messageIdIndex !== undefined && messageIdIndex >= 0) {
      console.log(messageIdIndex);
      console.log(curMessages[messageIdIndex], 'apa jay chou');
      curMessages[messageIdIndex].isRead = 'Y';
      messages.set(receiverProfileId, [...curMessages]);
      setMessages(new Map(messages));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('stompClient : ', stompClient);
    // Add the message to the messages array
    if (stompClient) {
      const fetchNextMessageId = async () => {
        try {
          const res = await fetch(`${endpoint}/message/sequence`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          // Process the response here
          if (res.ok) {
            const messageData = await res.json();
            return messageData.payload;
          } else {
            throw new Error('Failed to fetch next message id');
          }
        } catch (error) {
          console.error('Error fetching next message id:', error);
        }
      };

      const nextMessageId = await fetchNextMessageId();

      const messagePayload: Message = {
        messageId: nextMessageId,
        senderProfileId: +sessionProfile.profileId,
        receiverProfileId: +receiverProfileId,
        text: inputValue,
        sentDateTime: new Date(),
        isRead: 'N',
      };

      console.log('aaa : ', messagePayload);

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
      <div className='w-full flex-1 overflow-y-auto bg-white p-4'>
        {messages.get(receiverProfileId)?.map((message: Message, index) => {
          const nextMessage = messages.get(receiverProfileId)?.[index + 1];
          const hasSameProfileId =
            nextMessage &&
            +nextMessage.senderProfileId === +message.senderProfileId;

          return (
            <div
              className='message'
              key={index}
              data-message-id={message.messageId}
              sender-profile-id={message.senderProfileId}
            >
              <div
                className={`text-gray text-xs ${
                  +message.senderProfileId === +sessionProfile.profileId
                    ? 'text-right'
                    : 'text-left'
                }`}
              >
                <div>{format(message.sentDateTime, 'MM-dd HH:mm')}</div>
              </div>
              <div
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
                  } flex max-w-lg break-words px-4 py-2`}
                >
                  <div>{message.text}</div>
                  <div className='mt-4 self-end'>
                    {+message.senderProfileId === +sessionProfile.profileId && (
                      <div className='flex justify-end'>
                        <BiCheckDouble
                          className={`${message.isRead === 'Y' ? 'text-secondary' : 'text-white'}`}
                        />
                      </div>
                    )}
                  </div>
                </div>
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