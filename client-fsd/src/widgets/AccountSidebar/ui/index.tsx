import React from 'react';
import { getRole } from '@/entities/User';
import { AccountSidebarLink } from './AccountSidebarLink';

type Props = {};

export const AccountSidebar: React.FC<Props> = async () => {
  const role = await getRole();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h4 className="font-semibold">Manage My Account</h4>
        <div className="flex flex-col items-start gap-2 pl-5">
          <AccountSidebarLink
            href="/profile"
            name="Profile"
          />
          <AccountSidebarLink
            href="/profile/payment"
            name="Payment Options"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-semibold">My Orders</h4>
        <div className="flex flex-col items-start gap-2 pl-5">
          <AccountSidebarLink
            href="/orders"
            name="Orders"
          />
          <AccountSidebarLink
            href="/returns"
            name="Returns"
          />
          <AccountSidebarLink
            href="/cancellations"
            name="Cancellations"
          />
        </div>
      </div>
      <div>
        <AccountSidebarLink
          href="/wishlist"
          name="My Wishlist"
          className="font-semibold text-black"
        />
      </div>

      {role === 'ADMIN' && (
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">Admin</h4>
          <div className="flex flex-col items-start gap-2 pl-5">
            <AccountSidebarLink
              href="/profile/admin/store"
              name="Store"
            />
            <AccountSidebarLink
              href="/profile/admin/category"
              name="Category"
            />
            <AccountSidebarLink
              href="/profile/admin/brand"
              name="Brand"
            />
            <AccountSidebarLink
              href="/profile/admin/users"
              name="Users"
            />
            <AccountSidebarLink
              href="/profile/admin/item"
              name="Item"
            />
          </div>
        </div>
      )}
    </div>
  );
};
