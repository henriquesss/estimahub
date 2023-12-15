"use client"

import React, { useState, useContext } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { auth } from '../../config/firebase';
import { CreateEstimativeModal } from '@/components/CreateEstimativeModal';
import { useDisclosure } from "@nextui-org/react";
import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
    const { signOutContext, isAuthenticated } = useContext(AuthContext);

    const [reload, setReload] = useState(false);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
    const handleSignOut = async () => {
        try {
            await signOutContext();
            setReload(true)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container mx-auto py-5 text-sm">
            <CreateEstimativeModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
            <div className="flex justify-around items-center">
                <div>
                    <Link href="/">estimahub</Link>
                </div>

                <div className="flex flex-row items-center">
                    {isAuthenticated ? (
                        <>
                            <button
                                onClick={() => onOpen()}
                                className='text-sm mx-1 bg-pink-500 p-1 text-white rounded'
                            >
                                Criar
                            </button>
                            <div className="relative group text-right">
                                <button className="focus:outline-none">
                                    <Image
                                        src="/menu.png"
                                        width={24}
                                        height={24}
                                        alt="Picture of the author"
                                        className='rounded-2xl mt-2'
                                    />
                                </button>
                                <ul className="absolute right-0 hidden bg-gray-200 text-gray-600 p-2 space-y-2 rounded group-hover:block">
                                    <li className='text-gray-400'>{auth.currentUser.email}</li>
                                    <li><Link href="/account">conta</Link></li>
                                    <li><button onClick={() => handleSignOut()}>sair</button></li>
                                </ul>
                            </div>
                        </>
                    ): (
                        <div className="bg-black text-white p-1 rounded"><Link href="/signin">Entrar</Link></div>
                    )}
                </div>
            </div>
        </div>
    )
}