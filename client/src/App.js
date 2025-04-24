import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MedicalRecords from './MedicalRecords.json';
import { uploadToPinata } from './pinata';
import './App.css';

import {
  FaNotesMedical, FaUserMd, FaUpload, FaUserPlus,
  FaSearch, FaFileMedicalAlt, FaCheckCircle,
  FaTimesCircle, FaStethoscope, FaClipboardList
} from "react-icons/fa";

const CONTRACT_ADDRESS = "0xe4Dd847c3e3553aA9394B54D09128B53f25652D9";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [role, setRole] = useState("None");
  const [file, setFile] = useState(null);
  const [viewAddress, setViewAddress] = useState("");
  const [grantAddress, setGrantAddress] = useState("");
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState("");
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [profile, setProfile] = useState(null); // Profile state to store simple profile information

  const roleMap = ["None", "Patient", "Doctor"];

  useEffect(() => {
    if (window.ethereum) connectWallet();
  }, []);

  const addLog = (msg) => {
    const timestamp = new Date().toLocaleString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev]);
  };

  const connectWallet = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const instance = new ethers.Contract(CONTRACT_ADDRESS, MedicalRecords.abi, signer);
      const address = await signer.getAddress();
      const userRoleId = await instance.userRoles(address);

      setContract(instance);
      setAccount(address);
      setRole(roleMap[userRoleId]);
      setStatus(`✅ Connected: ${address} (${roleMap[userRoleId]})`);
      addLog(`Connected wallet: ${address}`);

      // Setting a simple profile (For demonstration purposes, this can be expanded with actual data)
      let profileInfo = "";

if (roleMap[userRoleId] === "Patient") {
  profileInfo = "Access and manage your personal health records. You can upload files and grant or revoke access to doctors.";
} else if (roleMap[userRoleId] === "Doctor") {
  profileInfo = "View authorized patient records. Use patient addresses to fetch and review medical history securely.";
} else {
  profileInfo = "Please register as either a Patient or Doctor to begin using the system.";
}

setProfile({
  address,
  role: roleMap[userRoleId],
  profileInfo
});
    } catch (err) {
      console.error(err);
      setStatus("❌ Wallet connection failed.");
    }
  };

  const registerAs = async (roleId) => {
    try {
      const tx = await contract.registerUser(roleId);
      await tx.wait();
      const newRole = roleMap[roleId];
      setStatus(`✅ Registered as ${newRole}`);
      setRole(newRole);
      addLog(`Registered as ${newRole}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Registration failed.");
    }
  };

  const handleUpload = async () => {
    if (!file || role !== "Patient") {
      alert("Only patients can upload.");
      return;
    }

    try {
      setStatus("⏳ Uploading to IPFS...");
      const cid = await uploadToPinata(file);
      setStatus("⏳ Uploading to blockchain...");
      const tx = await contract.uploadRecord(cid);
      await tx.wait();
      setStatus("✅ Record uploaded!");
      addLog(`Uploaded record with IPFS hash: ${cid}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed.");
    }
  };

  const getRecords = async () => {
    try {
      const target = viewAddress || account;
      const res = await contract.getRecords(target);
      setRecords(res);
      setStatus(`📁 Found ${res.length} record(s).`);
      addLog(`Fetched records for address: ${target}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to fetch records.");
    }
  };

  const grantAccess = async () => {
    try {
      const tx = await contract.grantAccess(grantAddress);
      await tx.wait();
      setStatus("✅ Access granted.");
      addLog(`Granted access to doctor: ${grantAddress}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to grant access.");
    }
  };

  const revokeAccess = async () => {
    try {
      const tx = await contract.revokeAccess(grantAddress);
      await tx.wait();
      setStatus("✅ Access revoked.");
      addLog(`Revoked access from doctor: ${grantAddress}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to revoke access.");
    }
  };

  return (
    <div className="App">
      <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#1976d2" }}>
        <FaNotesMedical /> Medical Records DApp
      </h2>

      <button onClick={connectWallet}><FaStethoscope /> Connect Wallet</button>

      <p><strong>👤 Address:</strong> {account}</p>
      <p><strong>🎓 Role:</strong> {role}</p>

      {/* Simple Profile Section */}
      {profile && (
        <div className="profile-section">
          <h4>👤 Profile</h4>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Profile Info:</strong> {profile.profileInfo}</p>
        </div>
      )}

      {role === "None" && (
        <>
          <h4>Register As:</h4>
          <button onClick={() => registerAs(1)}><FaUserPlus /> Patient</button>
          <button onClick={() => registerAs(2)}><FaUserMd /> Doctor</button>
        </>
      )}

      {role === "Patient" && (
        <>
          <h4><FaUpload /> Upload Medical Record</h4>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={handleUpload}><FaUpload /> Upload</button>

          <h4><FaUserMd /> Manage Doctor Access</h4>
          <input
            type="text"
            placeholder="Doctor's address"
            onChange={(e) => setGrantAddress(e.target.value)}
          />
          <button onClick={grantAccess}><FaCheckCircle /> Grant Access</button>
          <button onClick={revokeAccess}><FaTimesCircle /> Revoke Access</button>
        </>
      )}

      <h4><FaFileMedicalAlt /> View Medical Records</h4>
      {role === "Doctor" && (
        <input
          type="text"
          placeholder="Patient's address"
          onChange={(e) => setViewAddress(e.target.value)}
        />
      )}
      <button onClick={getRecords}><FaSearch /> Fetch Records</button>

      {status && <p className="status-message">{status}</p>}

      <ul className="record-list">
        {records.map((rec, idx) => (
          <li key={idx}>
            <a
              href={`https://gateway.pinata.cloud/ipfs/${rec.ipfsHash}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaFileMedicalAlt /> Record {idx + 1}
            </a>
          </li>
        ))}
      </ul>

      <div className="audit-logs-section">
        <button onClick={() => setShowLogs(!showLogs)}>
          <FaClipboardList /> {showLogs ? "Hide" : "Show"} Audit Logs
        </button>
        {showLogs && (
          <ul className="audit-log">
            {logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
