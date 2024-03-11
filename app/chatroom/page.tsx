'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../../models/message';
import { BiSend } from 'react-icons/bi';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { RiEmojiStickerLine } from 'react-icons/ri';
import { BsEmojiSmile } from 'react-icons/bs';

const Chatroom = () => {
  let initMsg: Message[] = [
    { text: 'halo I am gay', profileId: 1 },
    { text: 'what is your name', profileId: 1 },
    { text: 'halo I am not gay', profileId: 2 },
    { text: 'my name is jesus', profileId: 2 },
    { text: 'halo I am gay', profileId: 1 },
    { text: 'what is your name', profileId: 1 },
    { text: 'halo I am not gay', profileId: 2 },
    { text: 'my name is jesus', profileId: 2 },
    { text: 'halo I am gay', profileId: 1 },
    {
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going",
      profileId: 1,
    },
    {
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going",
      profileId: 2,
    },
    { text: 'my name is jesus', profileId: 2 },
    { text: 'halo I am gay', profileId: 1 },
    { text: 'what is your name', profileId: 1 },
    { text: 'halo I am not gay', profileId: 2 },
    { text: 'my name is jesus', profileId: 2 },
    { text: 'halo I am gay', profileId: 1 },
    { text: 'what is your name', profileId: 1 },
    { text: 'halo I am not gay', profileId: 2 },
    { text: 'my name is jesus', profileId: 2 },
    { text: 'halo I am gay', profileId: 1 },
    { text: 'what is your name', profileId: 1 },
    { text: 'halo I am not gay', profileId: 2 },
    { text: 'my name is jesus', profileId: 2 },
    { text: 'halo I am gay', profileId: 1 },
    { text: 'what is your name', profileId: 1 },
    { text: 'halo I am not gay', profileId: 2 },
    { text: 'my name is jesus', profileId: 2 },
    { text: 'halo I am gay', profileId: 1 },
    { text: 'what is your name', profileId: 1 },
    { text: 'halo I am not gay', profileId: 2 },
    { text: 'my name is jesus', profileId: 2 },
  ];

  const [messages, setMessages] = useState<Message[]>(initMsg);
  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const profileId = 1;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add the message to the messages array
    setMessages([...messages, { text: inputValue, profileId: 1 }]);
    // Clear the input field
    setInputValue('');
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-start '>
      {/* User info section */}
      <div className='flex w-1/2 items-center rounded-t-xl border-b bg-white p-4'>
        <div className='h-10 w-10 rounded-full bg-gray-300'></div>
        <span className='ml-2 font-bold'>User Name</span>
      </div>

      {/* Chat messages section */}
      <div className='w-1/2 flex-1 overflow-y-auto bg-white p-4'>
        {messages.map((message, index) => {
          const nextMessage = messages[index + 1];
          const hasSameProfileId =
            nextMessage && nextMessage.profileId === message.profileId;

          return (
            <div
              key={index}
              className={`${hasSameProfileId ? 'mb-0.5' : 'mb-3'}  flex ${
                message.profileId === profileId
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`${
                  message.profileId === profileId
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
        className='relative flex w-1/2 items-center rounded-b-xl border-t bg-white p-4'
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
