import { apiService } from '../services/apiService';

export const getLinkData = async (linkId) => {
  const response = await apiService.get(`/links/${linkId}`);
  return response.data;
};

export const createLinkData = async (linkData) => {
  const response = await apiService.post('/links', { dataArr: linkData });
  return response.data;
};
