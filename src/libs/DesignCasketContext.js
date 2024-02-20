import { createContext, useContext, useState } from "react";

const DesignCasketContext = createContext("");

const DebuggingCasketContext_Provider = ({ children }) => {
  const value = {
    version: '1.0.0',
  };
  return <DesignCasketContext.Provider value={ value }>
    { children }
  </DesignCasketContext.Provider>
}

const useDesignCasketContext = () => {
  return useContext(DesignCasketContext);
}

export { DebuggingCasketContext_Provider, useDesignCasketContext }