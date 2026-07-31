import { protocolMap } from '@/map';

export const isUrl = (url: URL) => {
  return protocolMap.includes(url.protocol);
};
