import { axios } from '@/shared/api';
import { ALL_USERS, auth } from '@/shared/config';
import { User } from '@/entities/User/model';

async function getUsers() {
  const session = await auth();
  const accessToken = session?.access_token || '';

  const request = await axios.getData<User>(ALL_USERS, accessToken);

  return request;
}

export default async function AdminPage() {
  const users = await getUsers();

  return (
    <div>
      Admin <div>{JSON.stringify(users)}</div>
    </div>
  );
}
