"use client"

import React, { useState, useContext, useEffect } from 'react';
import { Header } from "@/components/Header";
import { AuthContext } from '../../contexts/AuthContext';
import { formatUnixDateString } from '../../utils';

// Firebase stuff
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function AccountPage() {
    const { user } = useContext(AuthContext);

    const [userEstimatives, setUserEstimatives] = useState([]);
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        const getEstimatives = async () => {
            try {
                const estimativeCollectionRef = collection(db, 'estimatives');
                
                const estimativeQuery = query(estimativeCollectionRef, where('createdBy', '==', user.uid));
                const snapshot = await getDocs(estimativeQuery);

                const snapshotEstimatives = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))

                setUserEstimatives(snapshotEstimatives)
            } catch (error) {
                console.error(error)
            }
        }

        getEstimatives();
    }, [reloadData])

    const handleDelete = async (estimativeId) => {
        try {
            const deletedEstimative = await deleteDoc(doc(db, "estimatives", estimativeId));
            setReloadData(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Header />
            <section>
                <div className='container mx-auto py-5'>
                    <div className='flex flex-col items-center justify-center h-[400px]'>
                        <p className='text-2xl font-bold mb-5'>Conta</p>
                        <div className='flex flex-col items-center mb-10'>
                            {user ? (
                                <>
                                    <p className='text-xl font-bold mr-2'>{user.email}</p>
                                    <p className='text-gray-700'>membro desde {formatUnixDateString(user.metadata.createdAt)}</p>
                                </>
                            ) : (
                                <p>Carregando...</p>
                            )}
                        </div>
                        <p className='font-bold mb-5'>Suas estimativas até agora</p>

                        <div class="relative overflow-x-auto w-full">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Descrição
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Stack
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Devs
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Tempo
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userEstimatives.map(estimative => (
                                        <>
                                            <tr key={estimative.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {estimative.description.substr(0,35)}...
                                                </th>
                                                <td class="px-6 py-4">
                                                    {estimative.stack.toString()}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {estimative.devs}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {estimative.time} (dias)
                                                </td>
                                                <td class="px-6 py-4">
                                                   <button
                                                    className='text-red-500'
                                                    onClick={() => handleDelete(estimative.id)}
                                                   >
                                                    Excluir
                                                  </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {userEstimatives.length == 0 && (
                            <p className='mt-4'>Parece que você não postou nenhuma estimativa por enquanto</p>
                        )}
                        
                    </div>
                </div>
            </section>
        </>
    )
}
