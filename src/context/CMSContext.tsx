import React, { createContext, useContext, useState, useEffect } from "react";
import { CMSData, AdminCredentials } from "../types/cms";
import { INITIAL_CMS_DATA, DEFAULT_ADMIN_CREDENTIALS } from "../config/defaultData";

interface CMSContextType {
  data: CMSData;
  updateData: (updater: (prev: CMSData) => CMSData) => void;
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonStr: string) => boolean;
  processImageFile: (file: File) => Promise<string>;
  
  // Auth
  isAdmin: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  credentials: AdminCredentials;
  updateCredentials: (newCreds: AdminCredentials) => void;
}

const STORAGE_KEY_DATA = "inkana_cms_data_v2";
const STORAGE_KEY_AUTH = "inkana_admin_auth_v2";
const STORAGE_KEY_SESSION = "inkana_admin_session_v2";

const CMSContext = createContext<CMSContextType | null>(null);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load CMS Data
  const [data, setData] = useState<CMSData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) {
        return { ...INITIAL_CMS_DATA, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Error reading CMS data from localStorage", e);
    }
    return INITIAL_CMS_DATA;
  });

  // Load Admin Credentials
  const [credentials, setCredentials] = useState<AdminCredentials>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Error reading credentials from localStorage", e);
    }
    return DEFAULT_ADMIN_CREDENTIALS;
  });

  // Load Admin Session
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_SESSION) === "true";
    } catch {
      return false;
    }
  });

  // Save data to localStorage on change
  const updateData = (updater: (prev: CMSData) => CMSData) => {
    setData((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(next));
      } catch (err) {
        console.error("Storage quota error saving CMS data:", err);
      }
      return next;
    });
  };

  const resetToDefaults = () => {
    setData(INITIAL_CMS_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY_DATA);
    } catch (e) {
      console.warn(e);
    }
  };

  const exportJSON = () => {
    return JSON.stringify(data, null, 2);
  };

  const importJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === "object") {
        updateData(() => parsed);
        return true;
      }
    } catch (e) {
      console.error("Invalid JSON:", e);
    }
    return false;
  };

  // Helper to read and optimize PC uploaded image files to safe base64
  const processImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("El archivo seleccionado no es una imagen válida"));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Downscale huge camera photos (e.g. 4000x3000) to max 1200px width/height for web performance and localStorage safety
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          // Export with high quality JPEG
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.88);
          resolve(compressedDataUrl);
        };
        img.onerror = () => {
          resolve(e.target?.result as string);
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Auth functions
  const login = (user: string, pass: string): boolean => {
    if (
      user.trim().toLowerCase() === credentials.username.toLowerCase() &&
      pass === credentials.passwordHash
    ) {
      setIsAdmin(true);
      try {
        localStorage.setItem(STORAGE_KEY_SESSION, "true");
      } catch (e) {
        console.warn(e);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    } catch (e) {
      console.warn(e);
    }
  };

  const updateCredentials = (newCreds: AdminCredentials) => {
    setCredentials(newCreds);
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(newCreds));
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        updateData,
        resetToDefaults,
        exportJSON,
        importJSON,
        processImageFile,
        isAdmin,
        login,
        logout,
        credentials,
        updateCredentials,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
};
