/* eslint-disable @typescript-eslint/naming-convention */

import React from 'react';
import { User } from '@/entities/User';
import { FormEdit } from './FormEdit';

type Props = {
  user: User;
};

export const EditAccount: React.FC<Props> = async ({ user }) => {
  return <FormEdit user={user} />;
};
