import { create } from 'ipfs-http-client';

const projectId = '34d6561de15d07716020';
const projectSecret = 'Secret_key';
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
