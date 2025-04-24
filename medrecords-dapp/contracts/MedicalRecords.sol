// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MedicalRecords {
    address public owner;

    enum Role { None, Patient, Doctor }

    struct Record {
        string ipfsHash;
        address uploader;
    }

    mapping(address => Record[]) private records;
    mapping(address => Role) public userRoles;
    mapping(address => mapping(address => bool)) public accessPermissions;

    event RecordUploaded(address indexed patient, string ipfsHash);
    event UserRegistered(address indexed user, Role role);
    event AccessGranted(address indexed patient, address indexed doctor);
    event AccessRevoked(address indexed patient, address indexed doctor);

    constructor() {
        owner = msg.sender;
    }

    // 🧑‍⚕️ Register as patient or doctor
    function registerUser(uint8 role) external {
        require(userRoles[msg.sender] == Role.None, "Already registered");
        require(role == uint8(Role.Patient) || role == uint8(Role.Doctor), "Invalid role");
        userRoles[msg.sender] = Role(role);
        emit UserRegistered(msg.sender, Role(role));
    }

    // 📝 Upload record
    function uploadRecord(string calldata ipfsHash) external {
        require(userRoles[msg.sender] == Role.Patient, "Only patients can upload records");
        records[msg.sender].push(Record(ipfsHash, msg.sender));
        emit RecordUploaded(msg.sender, ipfsHash);
    }

    // 🔍 View records (owner, self, or authorized doctor)
    function getRecords(address user) external view returns (Record[] memory) {
        require(
            msg.sender == user || msg.sender == owner || accessPermissions[user][msg.sender],
            "Unauthorized access"
        );
        return records[user];
    }

    // ✅ Grant doctor access
    function grantAccess(address doctor) external {
        require(userRoles[msg.sender] == Role.Patient, "Only patients can grant access");
        require(userRoles[doctor] == Role.Doctor, "Only doctors can be granted access");
        accessPermissions[msg.sender][doctor] = true;
        emit AccessGranted(msg.sender, doctor);
    }

    // ❌ Revoke doctor access
    function revokeAccess(address doctor) external {
        require(userRoles[msg.sender] == Role.Patient, "Only patients can revoke access");
        accessPermissions[msg.sender][doctor] = false;
        emit AccessRevoked(msg.sender, doctor);
    }
}
