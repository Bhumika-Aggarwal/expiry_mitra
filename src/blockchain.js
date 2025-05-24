import { ethers } from 'ethers';
import abi from './abi.json'; 

const contractAddress = '0x74c94Ba5E2dCb5915B8220bd25865A0C5Cf5F6B1'; 

export const getContract = async () => {
if (!window.ethereum) {
alert("Please install MetaMask");
throw new Error("MetaMask not found");
}

await window.ethereum.request({ method: 'eth_requestAccounts' });

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
return new ethers.Contract(contractAddress, abi, signer);
};

export const fetchMedicine = async (batchId) => {
try {
const contract = await getContract();
const result = await contract.getMedicine(batchId);
return [
  result[0], // batchId
  result[1], // expiryDate
  result[2], // manufactureDate
  result[3], // greenfieldUrl
  result[4], // addedBy
];
} catch (error) {
console.error("Error fetching medicine:", error);
return null;
}
};