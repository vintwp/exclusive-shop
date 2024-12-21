import { auth } from '@/shared/config';

const getRole = async () => {
  const authSession = await auth();

  const role = authSession?.user.role || 'USER';

  return role;
};

export { getRole };
