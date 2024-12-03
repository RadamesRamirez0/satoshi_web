'use client';

import {
  ClockIcon,
  EyeOpenIcon,
  FileIcon,
  FileTextIcon,
  ImageIcon,
  PaperPlaneIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';

import { useSession } from '@/modules/auth/hooks/useSession';
import DocumentViewer from '@/modules/common/shared-ui/components/DocumentViewer';
import { Button } from '@/modules/common/ui/components/button';
import { Input } from '@/modules/common/ui/components/input';
import { cn } from '@/modules/common/ui/lib/utils';
import { formatBytes } from '@/modules/common/utils/formatBytes';
import parseTsToDate from '@/modules/common/utils/parseTsToDate';
import { Message } from '@/modules/p2p/models/message';

export interface NewMessage {
  message: string;
  file?: File;
}

export interface ChatProps {
  receiverName: string;
  messages: Message[];
  onSend: (newMessage: NewMessage) => Promise<boolean>;
  getImage: (messageId: string) => Promise<{ url: string; type: string } | undefined>;
}
type Image = Record<string, { url: string; type: string }>;

const Chat = ({ receiverName, messages, onSend, getImage }: ChatProps) => {
  const [file, setFile] = useState<File | undefined>();
  const [fileSrc, setFileSrc] = useState<string>();
  const [message, setMessage] = useState('');
  const [pendingMessages, setPendingMessages] = useState<NewMessage[]>();
  const fileRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const maxBytes = 3145728; //3MB
  const session = useSession();
  const [doc, setDoc] = useState<string>();
  const [images, setImages] = useState<Image>();
  const [length, setLength] = useState(0);

  const sendMessage = async (message: NewMessage) => {
    setPendingMessages((prev) => [...(prev ?? []), message]);
    setMessage('');
    setFile(undefined);

    await onSend(message);
  };

  const getAndSetImages = async (messageId: string) => {
    const url = await getImage(messageId);

    setImages((prev) => ({ ...prev, [messageId]: url }) as Image);
  };

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    const pMessages = pendingMessages?.map((m) => m.message);

    const promises = messages
      .filter((m) => m.attachment && !images?.[m.id])
      .map((m) => {
        return getAndSetImages(m.id);
      });

    void Promise.allSettled(promises).then((p) => {
      if (p.length === 0) {
        return;
      }
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight + 1000,
        behavior: 'smooth',
      });
    });

    messages.forEach((m) => {
      if (pMessages?.includes(m.message)) {
        setPendingMessages((previous) => [...(previous ?? []).filter((m) => !m.message)]);
      }
    });

    if (length === messages.length) {
      return;
    }

    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth',
    });

    setLength(messages.length);
  }, [messages]);

  useEffect(() => {
    if (!file) {
      setFileSrc(undefined);

      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setFileSrc(objectUrl);
  }, [file]);

  if (!session) {
    return <></>;
  }

  return (
    <div className='border-2  rounded-3xl flex flex-col divide-y h-[80vh] min-w-[330px] max-w-[360px]  w-1/3 bg-muted overflow-hidden '>
      <DocumentViewer src={doc} onClose={() => setDoc(undefined)} />
      <span className='py-4 px-4 flex items-center gap-3'>
        <FaRegCircleUser className='size-7' />
        <h2 className='text-xl font-bold'>{receiverName}</h2>
      </span>
      <div
        className='flex flex-col  p-4 h-full bg-background overflow-y-auto beauty-scroll'
        ref={chatRef}
      >
        {messages.map((m, i) => {
          const now = new Date();
          const date = parseTsToDate(m.timestamp);
          const isToday = date.toLocaleDateString() === now.toLocaleDateString();
          const dateParsed = isToday
            ? date.toLocaleTimeString(undefined, {
                minute: 'numeric',
                hour12: true,
                hour: 'numeric',
              })
            : date.toLocaleString(undefined, {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              });

          const nextMessage = messages[i + 1] ?? { timestamp: '0', sender_id: '0' };
          const previousMessage = messages[i - 1] ?? { timestamp: '0', sender_id: '0' };

          const nextDate = isToday
            ? parseTsToDate(nextMessage.timestamp).toLocaleTimeString(undefined, {
                minute: 'numeric',
                hour12: true,
                hour: 'numeric',
              })
            : parseTsToDate(nextMessage.timestamp).toLocaleString(undefined, {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              });

          return (
            <div
              key={m.id}
              className={cn(
                ' max-w-[70%] self-start flex flex-col items-start',
                i !== 0 && previousMessage.sender_id === m.sender_id ? 'mt-1.5' : 'mt-2',
                m.sender_id === session.user.id && 'self-end items-end',
              )}
            >
              {m.attachment &&
                (images?.[m.id]?.type.includes('image') ? (
                  <button className='bg-white/20 rounded-xl  mb-1'>
                    <Image
                      src={images[m.id].url}
                      width={100}
                      height={100}
                      alt={m.message}
                      className='w-auto h-full rounded-xl cursor-pointer hover:opacity-80 transition-opacity'
                      onClick={() => setDoc(images[m.id].url)}
                    />
                  </button>
                ) : (
                  <button
                    className='bg-white/20 rounded-xl p-2 mb-0.5'
                    onClick={() => setDoc(images?.[m.id].url)}
                  >
                    <FileIcon className='size-10  hover:text-primary transition-colors' />
                  </button>
                ))}

              <div
                className={cn(
                  'px-2 py-1.5 bg-zinc-700 rounded-xl w-fit',
                  m.sender_id === session.user.id && 'text-end bg-primary text-black',
                )}
              >
                {m.message}
              </div>
              <div className='flex gap-1.5 items-center'>
                {(nextDate !== dateParsed || m.sender_id !== nextMessage.sender_id) && (
                  <p
                    className={cn(
                      'text-xs font-medium mt-0.5 text-whiteBG/50',
                      m.sender_id === session.user.id && 'text-end',
                    )}
                  >
                    {dateParsed}
                  </p>
                )}
                {m.sender_id === session.user.id &&
                  i === messages.length - 1 &&
                  (!m.read ? (
                    <PaperPlaneIcon className='size-3 text-gray-400' />
                  ) : (
                    <EyeOpenIcon className='size-3 text-primary' />
                  ))}
              </div>
            </div>
          );
        })}
        {pendingMessages?.map((m, i) => (
          <div
            key={`pending-${i}`}
            className={cn('max-w-[70%]  flex flex-col', 'mt-1.5', 'self-end items-end')}
          >
            <div
              className={cn(
                'px-2 py-1.5  rounded-xl w-fit',
                'text-end bg-primary/50 text-black animate-pulse',
              )}
            >
              {m.message}
            </div>
            <div>
              <ClockIcon className='text-gray-400 animate-pulse mt-1' />
            </div>
          </div>
        ))}
      </div>
      {file && (
        <div className='py-3 px-2 flex items-center gap-2 bg-muted '>
          <button
            className='flex gap-2 items-center cursor-pointer hover:bg-zinc-700 p-1 rounded-xl transition-colors'
            onClick={() => setDoc(fileSrc)}
          >
            {file.type.includes('image') ? (
              <ImageIcon className='size-7' />
            ) : (
              <FileTextIcon className='size-7' />
            )}
            <span>
              <p className='text-sm'>{file.name}</p>
              <p
                className={cn(
                  'text-xs text-zinc-400',
                  file.size > maxBytes && 'text-red-500',
                )}
              >
                {formatBytes(file.size)}
              </p>
            </span>
          </button>
          <span className='flex-1 flex flex-col items-end justify-start h-full'>
            <Button
              size='icon'
              className='p-1'
              variant='destructive'
              onClick={() => setFile(undefined)}
            >
              <TrashIcon className=' size-4 shrink-0'></TrashIcon>
            </Button>
            {file.size > maxBytes && (
              <p className='text-sm text-red-500 flex-1 text-end'>
                File too long. Max 3MB
              </p>
            )}
          </span>
        </div>
      )}
      <div className='flex items-center px-2 py-2 gap-3'>
        <Button
          size='icon'
          variant='ghost'
          className='p-2'
          onClick={() => fileRef.current?.click()}
        >
          <input
            type='file'
            ref={fileRef}
            onChange={(e) => setFile(e.target.files?.[0])}
            className='hidden'
            accept='.pdf,.jpg,.jpeg,.png'
          ></input>
          <FileIcon className='size-5 shrink-0' />
        </Button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              void sendMessage({ message, file });
            }
          }}
        />
        <Button
          size='icon'
          className='p-2'
          disabled={(file?.size ?? 0) > maxBytes || !message || message === ''}
          onClick={() => void sendMessage({ message, file })}
        >
          <PaperPlaneIcon className='size-5 shrink-0' />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
