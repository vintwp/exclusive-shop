import { EditAccount } from '@/features/EditAccount';
import { getUser } from '@/entities/User';
import { ErrorMessage } from '@/shared/components';

export default async function MyAccountPage() {
  const req = await getUser();

  return (
    <div>
      {req.ok ? (
        <EditAccount user={req.data} />
      ) : (
        <ErrorMessage
          errorMessage={
            req.message || 'Something went wrong. Please reload page'
          }
        />
      )}
    </div>
  );
}
