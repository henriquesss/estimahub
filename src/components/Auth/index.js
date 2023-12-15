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
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const router = useRouter();

    const handleAuth = async () => {
        try {
            // Validate form fields
            const newErrors = {};
            if (!email) newErrors.email = 'Preencha o email';

            if (!password) newErrors.password = 'Preencha a senha';

            // If there are errors, set them in the state
            if (Object.keys(newErrors).length > 0) setErrors(newErrors);
            else {
                // Everything is ok
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
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col flex-wrap">
            {errors.email && ( <p className='text-red-500'>{errors.email}</p>)}
            <input
                type="text"
                placeholder="Email"
                onChange={event => setEmail(event.target.value)}
            />

            {errors.password && (<p className='text-red-500'>{errors.password}</p>)}
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