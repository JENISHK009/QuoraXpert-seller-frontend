/* eslint-disable no-undef */
// Utility function to convert hex to ArrayBuffer
const hexToArrayBuffer = (hex) => {
  if (typeof hex !== "string") {
    throw new TypeError("Expected input to be a string");
  }
  if (hex.length % 2 !== 0) {
    throw new TypeError("Invalid hex string");
  }

  const matched = hex.match(/.{1,2}/g);
  if (!matched) {
    throw new TypeError("Invalid hex string");
  }

  return new Uint8Array(matched.map((byte) => parseInt(byte, 16)));
};

// Utility function to import the key
const importKey = async (keyHex) => {
  const keyBuffer = hexToArrayBuffer(keyHex);

  return await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
};

// Main decryption function
export const decrypt = async (payload) => {
  const secretKeyHex =
    "4a923a61e570a9c62b153be0e8f6a1bb01b35c9d6f3c51cc676049d0e34d1ecf";
  const ivHex = "ecb85888c359bda2349146a0e35a2520";
  const algorithm = "AES-CBC"; // Default to 'AES-CBC' if not provided

  if (typeof payload !== "string") {
    throw new TypeError("Expected payload to be a string");
  }

  // Convert payload from hex to ArrayBuffer
  const payloadBuffer = hexToArrayBuffer(payload);

  // Import the secret key

  const key = await importKey(secretKeyHex);

  // Convert IV from hex to ArrayBuffer
  const ivBuffer = hexToArrayBuffer(ivHex);

  // Decrypt the payload
  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: algorithm,
      iv: ivBuffer,
    },
    key,
    payloadBuffer
  );
  // Convert decrypted ArrayBuffer to string
  const decoder = new TextDecoder();
  const decryptedText = decoder.decode(decryptedBuffer);

  return decryptedText;
};
