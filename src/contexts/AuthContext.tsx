"use client";

import React from "react";
import { createContext, useEffect, useState, ReactNode } from "react";

import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { useRouter } from "next/navigation";

interface IAuthContextProps {
  user: FirebaseUser | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOutContext: () => Promise<void>;
}
export const AuthContext = createContext<IAuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const userLogged = auth.currentUser;
    if (userLogged) setUser(userLogged);
    else {
      setUser(null);
      router.push("/");
    }
  }, [router]);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  async function signIn(email: string, password: string): Promise<void> {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const authenticatedUser = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (authenticatedUser.user) setUser(authenticatedUser.user);
    } catch (error) {
      console.error(error);
    }
  }

  async function signOutContext(): Promise<void> {
    try {
      router.push("/");
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  const contextValue: IAuthContextProps = {
    user,
    isAuthenticated,
    signIn,
    signOutContext,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
