import { useClinicInfo } from './useApi';
import { normalizeClinicInfo } from '../utils/clinicInfo';

export const useClinicInfoData = () => {
  const { data, loading, error } = useClinicInfo();

  return {
    data: normalizeClinicInfo(data),
    loading,
    error,
  };
};
