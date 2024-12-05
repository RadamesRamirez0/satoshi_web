'use client';

import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { apiUrl, baseImage } from '@/modules/common/constants/env';
import { Button } from '@/modules/common/ui/components/button';
import { Input } from '@/modules/common/ui/components/input';
import { toast } from '@/modules/common/utils/toast';
import PhotoProfile from '@/modules/users/components/PhotoProfile';
import { usersRepository } from '@/modules/users/repository';

export interface UserMeAliasProps {
  initialAlias: string;
  email: string;
}

const UserMeAlias = ({ initialAlias, email }: UserMeAliasProps) => {
  const [alias, setAlias] = useState(initialAlias);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updatingPhoto, setUpdatingPhoto] = useState(false);
  const [photoProfile, setPhotoProfile] = useState<string>();
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const session = useSession();
  const t = useTranslations('UserMe');

  const handleUpdateAlias = async () => {
    if (!session) {
      return;
    }

    setUpdating(true);
    const res = await usersRepository.updateAlias({
      body: { new_alias: alias },
      token: session.token,
    });

    if (!res.data?.alias_updated) {
      setAlias(initialAlias);
      toast.error(t('updatingAliasError'));
    }

    setUpdating(false);
    setEditing(false);
  };

  const handleUpdatePhoto = async () => {
    if (!session || !file) {
      return;
    }

    setUpdatingPhoto(true);
    const formData = new FormData();

    formData.append('file', file);
    formData.append('file_type', 'profile_picture');

    await fetch(`${apiUrl}/v1/users/upload_file`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }).catch(() => toast.error('Error uploading photo'));

    setUpdatingPhoto(false);
    setPhotoProfile(`${baseImage}${session.user.id}/profile_picture.jpg`);
    setFile(undefined);
  };

  useEffect(() => {
    void handleUpdatePhoto();
  }, [file]);

  return (
    <div className='flex items-start gap-4'>
      <section className='flex'>
        <button
          className='hover:opacity-80 transition-opacity group relative size-18 flex-1 shrink-0'
          onClick={() => inputRef.current?.click()}
        >
          <input
            type='file'
            className='hidden'
            ref={inputRef}
            onChange={(e) => setFile(e.target.files?.[0])}
          />

          <PhotoProfile key={photoProfile} className='w-[56px]' />

          <Pencil1Icon className='absolute hidden p-3 text-primary peer-hover:block group-hover:block top-0 bottom-0 left-0 right-0 z-10 w-full h-full bg-black/60 rounded-full transition-all' />
        </button>
      </section>
      <section className='flex flex-col  '>
        <span className='flex gap-3 items-center'>
          {!editing && <p className='text-2xl font-bold'>{alias}</p>}
          {editing && <Input value={alias} onChange={(e) => setAlias(e.target.value)} />}
          {!editing && (
            <Button
              size='icon'
              variant='ghost'
              className='h-auto w-auto p-2'
              onClick={() => setEditing(true)}
            >
              <Pencil1Icon className='size-4' />
            </Button>
          )}
          {editing && (
            <Button
              size='icon'
              className='h-auto w-auto p-2'
              onClick={() => void handleUpdateAlias()}
              disabled={updating}
            >
              <CheckIcon className='size-5 ' />
            </Button>
          )}
        </span>
        <p className='text-lg font-medium text-gray-400'>{email}</p>
      </section>
    </div>
  );
};

export default UserMeAlias;
