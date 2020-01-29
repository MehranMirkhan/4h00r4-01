import React, { useContext, createContext, useMemo } from "react";

import { storageContext, initialContext } from "./StorageProvider";
import { apiContext, createDefaultAPI } from "./ApiProvider";

import makeServices from "src/services";

export const serviceContext = createContext(
  makeServices(initialContext, createDefaultAPI())
);

const ServiceProvider: React.FC = ({ children }) => {
  const storage = useContext(storageContext);
  const api = useContext(apiContext);
  const services = useMemo(() => makeServices(storage, api), [storage, api]);
  return (
    <serviceContext.Provider value={services}>
      {children}
    </serviceContext.Provider>
  );
};

export default ServiceProvider;
