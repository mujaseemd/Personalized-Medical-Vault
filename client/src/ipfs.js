import { create } from 'ipfs-http-client';

const projectId = '34d6561de15d07716020';
const projectSecret = '1fc721d0b8fce8edc12eb93e8eb72965abf831b462304238cef3ff28bcf94b66';
const auth = 'Basic ' + btoa(`${projectId}:${projectSecret}`);

const ipfs = create({
  host: 'api.pinata.cloud',
  port: 443,
  protocol: 'https',
  headers: {
    Authorization: auth,
  },
});

export default ipfs;