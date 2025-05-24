import React, { useState } from 'react';
import { extractTextFromImage, extractExpiryAndBatch } from './ocrUtils';
import { fetchMedicine } from './blockchain';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const text = await extractTextFromImage(file);
      console.log("🧾 OCR Text:", text);
      const { expiryDate, batchId, manufactureDate: ocrMfg } = extractExpiryAndBatch(text);
      console.log("🆔 Extracted Batch ID:", batchId);
      const result = await fetchMedicine(batchId);
      if (!result) {
        setOutput("❌ Medicine not found or error occurred.");
        setLoading(false);
        return;
      }

      const [storedBatch, storedExpiry, storedMfg, greenfieldUrl, addedBy] = result;

      if (!storedBatch || storedBatch === "") {
        setOutput("❌ Medicine not found on blockchain.");
      } else if (storedExpiry !== expiryDate || storedMfg !== ocrMfg) {
        setOutput(`⚠️ Data mismatch detected!\n⏳ Original Expiry: ${storedExpiry}\n🛠 Original Mfg: ${storedMfg}`);
      } else {
        setOutput(
          `✅ VALID MEDICINE\n\n📦 Batch: ${storedBatch}\n🏭 Mfg: ${storedMfg}\n⏳ Expiry: ${storedExpiry}\n📄 Certificate: ${greenfieldUrl}\n👤 Added By: ${addedBy}`
        );
      }
    } catch (err) {
      console.error("Error during verification:", err);
      setOutput("⚠️ Something went wrong.");
    }

    setLoading(false);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) {
      setImagePreview(URL.createObjectURL(selected));
      setOutput('');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🧪 Expiry Mitra</h1>
        <p className="subtitle">AI + Blockchain | opBNB </p>
        <label htmlFor="file-upload" className="custom-upload">
          📁 Upload Medicine Label
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />

        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="preview" />
        )}

        <button
          onClick={handleUpload}
          className="upload-button"
          disabled={!file || loading}
        >
          {loading ? '⏳ Processing...' : '🔍 Check Medicine'}
        </button>

        {output && (
          <div className="result-box fade-in">
            <pre>{output}</pre>
          </div>
        )}
      </div>

      <footer className="footer">
        🚀 Built by <strong>Team FireFlies</strong> for BNB AI Hackathon
      </footer>
    </div>
  );
}
export default App;