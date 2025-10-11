import { usePage } from "@inertiajs/react";

export default function useAuthorization() {
  const {auth} = usePage().props;

  const can = (permission) => {
    return auth.user.permissions.includes(permission);
  };

  const isAdmin = () => {
    return auth.user.roles.includes('system administrator');
  };

  return {can, isAdmin};
}
