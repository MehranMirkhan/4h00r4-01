import React, { useContext, createContext, useMemo, useEffect } from "react";

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
  useEffect(() => {
    const { token, me } = storage.storageState.auth;
    if (!!token && (!me || Object.keys(me).length === 0))
      services.users.fetchMe();
  }, [storage.storageState.auth, services]);
  return (
    <serviceContext.Provider value={services}>
      {children}
    </serviceContext.Provider>
  );
};

export default ServiceProvider;
