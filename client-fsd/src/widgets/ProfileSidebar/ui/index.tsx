import React from 'react';
import { getRole } from '@/entities/User';
import { ProfileSidebarLink } from './ProfileSidebarLink';

type Props = {};

export const ProfileSidebar: React.FC<Props> = async () => {
  const role = await getRole();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h4 className="font-semibold">Manage My Account</h4>
        <div className="flex flex-col items-start gap-2 pl-5">
          <ProfileSidebarLink
            href="/profile"
            name="Profile"
          />
          <ProfileSidebarLink
            href="/profile/payment"
            name="Payment Options"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-semibold">My Orders</h4>
        <div className="flex flex-col items-start gap-2 pl-5">
          <ProfileSidebarLink
            href="/orders"
            name="Orders"
          />
          <ProfileSidebarLink
            href="/returns"
            name="Returns"
          />
          <ProfileSidebarLink
            href="/cancellations"
            name="Cancellations"
          />
        </div>
      </div>
      <div>
        <ProfileSidebarLink
          href="/wishlist"
          name="My Wishlist"
          className="font-semibold text-black"
        />
      </div>

      {role === 'ADMIN' && (
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">Admin</h4>
          <div className="flex flex-col items-start gap-2 pl-5">
            <ProfileSidebarLink
              href="/profile/admin/store"
              name="Store"
            />
            <ProfileSidebarLink
              href="/profile/admin/category"
              name="Category"
            />
            <ProfileSidebarLink
              href="/profile/admin/brand"
              name="Brand"
            />
            <ProfileSidebarLink
              href="/profile/admin/users"
              name="Users"
            />
            <ProfileSidebarLink
              href="/profile/admin/item"
              name="Item"
            />
          </div>
        </div>
      )}
    </div>
  );
};
