import { usePage } from '@inertiajs/react';

export default function useDirectorates() {
  const directorates = usePage().props.shared.directorates || [];

  const getDropdownValues = () => {
    return directorates; // Already [{ value: '1', label: 'Finance' }]
  };

  return { getDropdownValues };
}