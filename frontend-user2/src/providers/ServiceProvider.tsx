import React, { useContext, createContext } from "react";

import { storageContext, initialContext } from "./StorageProvider";
import { apiContext, createDefaultAPI } from "./ApiProvider";

import services from "src/services";

export const serviceContext = createContext(
  services(initialContext, createDefaultAPI())
);

const ServiceProvider: React.FC = ({ children }) => {
  const storage = useContext(storageContext);
  const api = useContext(apiContext);
  return (
    <serviceContext.Provider value={services(storage, api)}>
      {children}
    </serviceContext.Provider>
  );
};

export default ServiceProvider;
