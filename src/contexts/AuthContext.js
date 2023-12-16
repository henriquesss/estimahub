"use client"

import { createContext, useEffect, useState } from "react";

import { db, auth } from '../config/firebase';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation'

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const router = useRouter();

    const isAuthenticated = !!user;

    useEffect(() => {
        const userLogged = auth.currentUser;
        if(userLogged) setUser(userLogged);
        else {
            setUser(null);
            router.push('/');
        }
    }, [router])

    onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
    })

    async function signIn(email, password) {
        try {
            const persistence = await setPersistence(auth, browserLocalPersistence);
            const authenticatedUser = await signInWithEmailAndPassword(auth, email, password);
            if(authenticatedUser.user) setUser(authenticatedUser.user);
        } catch (error) {
            console.error(error)
        }
    }

    async function signOutContext() {
        try {
            router.push('/')
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOutContext }}>
            {children}
        </AuthContext.Provider>
    )
}
