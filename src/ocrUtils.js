import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (imageFile) => {
  const { data: { text } } = await Tesseract.recognize(imageFile, 'eng');
  return text;
};

export const extractExpiryAndBatch = (text) => {
  const expiry = text.match(/(EXP|Expiry)[^\d]*(\d{2}\/\d{4}|\d{4})/i);
  const batch = text.match(/(Batch|Lot)[^\w]*(\w+)/i);
  const manufacture = text.match(/(Mfg)[^\d]*(\d{2}\/\d{4}|\d{4})/i);

  return {
    expiryDate: expiry ? expiry[2] : 'Not found',
    batchId: batch ? batch[2] : 'Not found',
    manufactureDate: manufacture ? manufacture[2] : 'Not found'
  };
};
