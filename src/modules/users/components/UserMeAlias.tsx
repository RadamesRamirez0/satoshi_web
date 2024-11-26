'use client';

import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';

import { useSession } from '@/modules/auth/hooks/useSession';
import { Button } from '@/modules/common/ui/components/button';
import { Input } from '@/modules/common/ui/components/input';
import { toast } from '@/modules/common/utils/toast';
import { usersRepository } from '@/modules/users/repository';

export interface UserMeAliasProps {
  initialAlias: string;
  email: string;
}

const UserMeAlias = ({ initialAlias, email }: UserMeAliasProps) => {
  const [alias, setAlias] = useState(initialAlias);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

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

  return (
    <div className='flex items-start gap-4'>
      <FaRegCircleUser className='size-14' />
      <span className='flex flex-col  '>
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
      </span>
    </div>
  );
};

export default UserMeAlias;
