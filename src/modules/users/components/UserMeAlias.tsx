'use client';

import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { apiUrl } from '@/modules/common/constants/env';
import { ApiResponse } from '@/modules/common/interfaces/apiResponse';
import Clipboard from '@/modules/common/shared-ui/components/Clipboard';
import { Button } from '@/modules/common/ui/components/button';
import { Input } from '@/modules/common/ui/components/input';
import { toast } from '@/modules/common/utils/toast';
import PhotoProfile from '@/modules/users/components/PhotoProfile';
import { usersRepository } from '@/modules/users/repository';

export interface UserMeAliasProps {
  initialAlias: string;
  email: string;
  referal: string;
  referalUses: number;
}

const UserMeAlias = ({ initialAlias, email, referal, referalUses }: UserMeAliasProps) => {
  const [alias, setAlias] = useState(initialAlias);
  const [referralCode, setReferralCode] = useState(referal);
  const [editingReferral, setEditingReferral] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updatingPhoto, setUpdatingPhoto] = useState(false);
  const [photoProfile, setPhotoProfile] = useState<string>();
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const session = useSession();
  const t = useTranslations('UserMe');

  const handleUpdateReferral = async () => {
    if (!session) {
      return;
    }

    setUpdating(true);
    const res = await usersRepository.updateReferral({
      body: { new_referal_code: referralCode },
      token: session.token,
    });

    if (!res.data?.referal_code_updated) {
      setReferralCode(referal);

      if (res.error === 'Referal code already in use. Please choose a different code.') {
        toast.error(t('referralUsed'));
      } else {
        toast.error(t('defaultReferralError'));
      }
    }

    setUpdating(false);
    setEditingReferral(false);
  };

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

    const res = await fetch(`${apiUrl}/v1/users/upload_file`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }).catch(() => toast.error('Error uploading photo'));

    if (!(typeof res === 'string')) {
      const url = (await res.json()) as ApiResponse<{ image_url: string }>;
      console.log(url);
      setPhotoProfile(url.data?.image_url);
    }

    setUpdatingPhoto(false);
    setFile(undefined);
  };

  useEffect(() => {
    void handleUpdatePhoto();
  }, [file]);

  return (
    <div className='flex  gap-4 items-start'>
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
          {updatingPhoto ? (
            <div className='rounded-full size-[56px] bg-white animate-pulse' />
          ) : (
            <PhotoProfile key={photoProfile} className='w-[56px]' />
          )}

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
              loading={updating}
            >
              <CheckIcon className='size-5 ' />
            </Button>
          )}
        </span>
        <p className='text-lg font-medium text-gray-400'>{email}</p>
      </section>
      <section className='flex-1 flex justify-end  flex-col items-end'>
        <article className='flex  items-center article'>
          {!editingReferral && (
            <Button
              size='icon'
              variant='ghost'
              className='h-auto w-auto p-2'
              onClick={() => setEditingReferral(true)}
            >
              <Pencil1Icon className='size-4' />
            </Button>
          )}
          {editingReferral && (
            <Button
              size='icon'
              className='h-auto w-auto p-2'
              onClick={() => void handleUpdateReferral()}
              disabled={updating}
              loading={updating}
            >
              <CheckIcon className='size-5 ' />
            </Button>
          )}
          <p className='text-sm font-bold text-whiteBG/70 mr-3'>{t('referalCode')}</p>

          <span className='flex gap-2 items-center'>
            {!editingReferral && <p className='font-mono font-medium'>{referralCode}</p>}
            {editingReferral && (
              <Input
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
            )}
            <Clipboard text={referralCode} />
          </span>
        </article>
        <article className='flex gap-3 items-center'>
          <p className='text-sm font-bold text-whiteBG/70'>{t('remainingUses')}</p>
          <p className='font-medium'>{referalUses}</p>
        </article>
      </section>
    </div>
  );
};

export default UserMeAlias;
