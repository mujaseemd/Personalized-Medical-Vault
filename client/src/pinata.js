import axios from 'axios';

const PINATA_API_KEY = '34d6561de15d07716020';
const PINATA_SECRET_API_KEY = 'Secret_key';

export const uploadToPinata = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const formData = new FormData();
  formData.append('file', file);

  const metadata = JSON.stringify({
    name: file.name,
  });
  formData.append('pinataMetadata', metadata);

  try {
    const res = await axios.post(url, formData, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });

    return res.data.IpfsHash; // this is the CID
  } catch (error) {
    console.error('Pinata upload failed:', error);
    throw error;
  }
};
