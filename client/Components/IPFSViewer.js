import React, { useState } from "react";

const IPFSViewer = () => {
  const [cid, setCid] = useState("");
  const [url, setUrl] = useState("");

  const handleView = () => {
    // Using Pinata or public IPFS gateway
    const gatewayUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;
    setUrl(gatewayUrl);
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-white max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">IPFS File Viewer</h2>
      <input
        type="text"
        placeholder="Enter IPFS CID"
        className="border px-3 py-2 rounded w-full mb-4"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
      />
      <button
        onClick={handleView}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View File
      </button>

      {url && (
        <div className="mt-4">
          <p className="text-sm text-gray-700 mb-1">Preview / Download:</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {url}
          </a>
          <div className="mt-2">
            <iframe
              src={url}
              title="IPFS File"
              className="w-full h-96 border"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPFSViewer;
