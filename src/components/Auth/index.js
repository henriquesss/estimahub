"use client"

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../config/firebase';
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';

export const Auth = ({ type }) => {
    const { signIn } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleAuth = async () => {
        try {
            const usersCollectionRef = collection(db, "users");

            if(type == 'signin') await signIn(email, password);
            else {
                const createdFirebaseAuth = await createUserWithEmailAndPassword(auth, email, password)
                const createdDatabaseUser = await addDoc(usersCollectionRef, {
                    email,
                    firebase_uid: createdFirebaseAuth.user.uid,
                    createdAt: new Date()
                })
            }
            

            router.push('/');
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col flex-wrap">
            <input
                type="text"
                placeholder="Email"
                onChange={event => setEmail(event.target.value)}
            />

            <input
                type="password"
                placeholder="Senha"
                onChange={event => setPassword(event.target.value)}
            />

            <button
                onClick={() => handleAuth()}
                className='bg-black text-white p-1 rounded mt-3'
            >
                {type == 'signin' ? 'Entrar' : 'Criar'}
            </button>
        </div>
    )
}