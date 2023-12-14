"use client"

import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase';
import { getDocs, collection, query, limit } from 'firebase/firestore';
import { EstimativeCard } from '@/components/EstimativeCard';

export const Estimatives = ({ limitParam }) => {
    const [estimatives, setEstimatives] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const estimativesCollectionRef = collection(db, "estimatives");

    useEffect(() => {
        const getEstimatives = async () => {
            try {
                let estimativeQuery;

                if(limitParam) estimativeQuery = query(estimativesCollectionRef, limit(limitParam ? limitParam : 9));
                else estimativeQuery = query(estimativesCollectionRef);

                const response = await getDocs(estimativeQuery);
                const filteredResponse = response.docs.map(doc => ({...doc.data(), id: doc.id}));
                setEstimatives(filteredResponse);
                setIsLoading(false);
            } catch (error) {
                console.error(error)
            }
        }

        getEstimatives();
    },[estimativesCollectionRef])

    return (
        <div className='container mx-auto mb-10'>
            {isLoading && (
                <p>Carregando...</p>
            )}

            {estimatives.length === 0 && !isLoading && (
                <p>Sem estimativas por enquanto :/</p>
            )}

            <div className='flex flex-wrap justify-around'>
                {estimatives.map(est => (
                    <>
                        <div className='md:w-80 w-full mb-4' key={est.id}>
                            <EstimativeCard
                                description={est.description}
                                stack={est.stack}
                                devs={est.devs}    
                                time={est.time}    
                            />
                        </div>
                    </>
                ))}
            </div>

            
        </div>

    )
}