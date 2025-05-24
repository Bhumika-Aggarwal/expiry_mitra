require('dotenv').config();
const axios = require('axios');

const privateKey = process.env.PRIVATE_KEY;

if (!privateKey) {
  console.error('Please set your PRIVATE_KEY in the .env file');
  process.exit(1);
}

// Example: headers with authorization (if needed)
const headers = {
  'Authorization': `Bearer ${privateKey}`,
  'Content-Type': 'application/json'
};

async function createBucket(bucketName) {
  try {
    const response = await axios.post(
      'https://greenfield-api.bnbchain.org/api/buckets', // Confirm this URL is correct for bucket creation
      { name: bucketName },
      { headers }
    );
    console.log('Bucket created:', response.data);
  } catch (error) {
    console.error('Failed to create bucket:', error.response?.data || error.message);
  }
}

createBucket('my-new-bucket');
