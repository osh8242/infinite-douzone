import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({ children })  => {
  
  const [loading, setLoading] = useState(false);

  const contextValue = {
    loading, 
    setLoading
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
}

export { LoadingProvider, LoadingContext };
export default LoadingProvider;

export const useLoading = () =>{
  return useContext(LoadingContext);
}