import { useEffect, useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { UserPaymentMethod } from '@/modules/users/models/userPaymentMethod';
import { usersRepository } from '@/modules/users/repository';
import { AddPaymentMethodDTO } from '@/modules/users/repository/dtos/addPaymentMethodDto';

export interface UseUserPaymentMethodsValues {
  methods: UserPaymentMethod[];
  addMethod: (method: AddPaymentMethodDTO) => Promise<void>;
  fetchMethods: () => Promise<void>;
}

export const useUserPaymentMethods = (): UseUserPaymentMethodsValues => {
  const [methods, setMethods] = useState<UserPaymentMethod[]>([]);
  const session = useSession();

  const fetchMethods = async () => {
    if (!session?.token) {
      return;
    }

    const res = await usersRepository.getPaymentMethods({ token: session.token });

    if (res.error || !res.data) {
      return;
    }

    setMethods(res.data);
  };

  const addMethod = async (method: AddPaymentMethodDTO) => {
    if (!session?.token) {
      return;
    }

    const res = await usersRepository.addPaymentMethod({
      token: session.token,
      body: method,
    });

    if (res.error || !res.data) {
      return;
    }

    await fetchMethods();
  };

  useEffect(() => {
    if (!session?.token) {
      return;
    }
    void fetchMethods();
  }, [session?.token]);

  return {
    fetchMethods,
    methods,
    addMethod,
  };
};
