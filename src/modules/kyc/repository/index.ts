import { createRepository } from '@/modules/common/api/createRepository';
import { kycApiUrl } from '@/modules/kyc/constants/apiUrl';
import { getKycToken } from '@/modules/kyc/repository/getKycToken';

const repository = {
  getKycToken,
};

export const kycRepository = createRepository(repository, kycApiUrl);
