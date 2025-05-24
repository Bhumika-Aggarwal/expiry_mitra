# Expiry Mitra

This app helps users verify the **expiry date** and **authenticity** of medicines using AI and Blockchain (BNB Smart Chain)

## Features

- Upload a photo of a medicine strip or label.
- AI (OCR) extracts expiry date and batch number.
- Smart contract on BNB Chain verifies authenticity.
- Each valid product is logged on blockchain .

## Tech Stack

- **Frontend**: React
- **Blockchain**: Solidity on BNB Smart Chain Testnet
- **AI/OCR**: Tesseract.js
- **Wallet**: MetaMask

## Smart Contract

```solidity
struct Medicine {
    string batchId;
    string expiryDate;
    string greenfieldUrl;
    address addedBy;
}
