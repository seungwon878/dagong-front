import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AppContextType {
  // 여기에 필요한 전역 상태들을 추가하세요
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  memberid: string;
  setMemberid: (memberid: string) => void;
  authToken: string;
  setAuthToken: (authToken: string) => void;
  isSuccess: boolean;
  setIsSuccess: (isSuccess: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [memberid, setMemberid] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    const memberid = localStorage.getItem('memberId');
    const authToken = localStorage.getItem('authToken'); 
    const isSuccess = localStorage.getItem('isSuccess');
    if (memberid) {
      setMemberid(memberid);
    } 
    if (authToken) {
      setAuthToken(authToken);
    }
    if (isSuccess) {
      setIsSuccess(isSuccess === 'true');
    }
  }, []);

  return (
    <AppContext.Provider value={{ isLoading, setIsLoading, memberid, setMemberid, authToken, setAuthToken, isSuccess, setIsSuccess }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 