import { Table } from '@/shared/ui';

export const AdminDataTableWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Table className="table-fixed overflow-hidden">{children}</Table>;
};
