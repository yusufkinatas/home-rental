import React from 'react';
import { AuthService } from '@services/AuthService';
import { LocalStorageService } from '@services/LocalStorageService';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { User } from 'types';

interface IProfileContext {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  initialized: boolean;
}

const ProfileContext = createContext<IProfileContext>({} as IProfileContext);

export const ProfileContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await LocalStorageService.LoadObj('TOKEN');

        if (token) {
          const { user } = await AuthService.getProfile();

          setUser(user);
        }
        setInitialized(true);
      } catch (error) {
        LocalStorageService.DeleteObj('TOKEN');
        setInitialized(true);
      }
    })();
  }, []);

  return (
    <ProfileContext.Provider value={{ user, setUser, initialized }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
