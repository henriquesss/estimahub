"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import {
  getDocs,
  collection,
  query,
  limit,
  QuerySnapshot,
} from "firebase/firestore";
import { EstimativeCard } from "../EstimateCard";
import { IEstimate } from "../../interfaces/Estimate";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface EstimatesComponentParams {
  limitParam?: number;
}

export const Estimates = ({ limitParam }: EstimatesComponentParams) => {
  const router = useRouter();

  const [estimatives, setEstimatives] = useState<IEstimate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const estimativesCollectionRef = collection(db, "estimates");

  useEffect(() => {
    const getEstimatives = async () => {
      try {
        let estimateQuery;

        if (limitParam) {
          estimateQuery = query(
            estimativesCollectionRef,
            limit(limitParam ? limitParam : 9),
          );
        } else estimateQuery = query(estimativesCollectionRef);

        const response: QuerySnapshot = await getDocs(estimateQuery);

        const filteredResponse: IEstimate[] = response.docs.map((doc) => ({
          // ...doc.data(),
          id: doc.id,
          description: doc.data().description,
          stack: doc.data().stack,
          time: doc.data().time,
          devs: doc.data().devs,
        }));
        setEstimatives(filteredResponse);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getEstimatives();
  }, []);

  return (
    <div className="container mx-auto mb-10">
      {isLoading && <p>Loading...</p>}

      {estimatives.length === 0 && !isLoading && (
        <p>Without estimates for now :/</p>
      )}

      {estimatives.length > 0 && (
        <div>
          <div className="flex flex-wrap justify-around">
            {estimatives.map((est) => (
              <>
                <div className="md:w-80 w-full mb-4" key={est.id}>
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

          <Button
            className="mt-4"
            onClick={() => {
              router.push("/estimates");
            }}
          >
            See more
          </Button>
        </div>
      )}

      {/*
                // Mockup to not use all the limit of Firebase requests

                <div className='flex flex-wrap justify-around'>
                <>
                    <div className='md:w-80 w-full mb-4' key={1}>
                        <EstimativeCard
                            description="Descrição teste"
                            stack="teste, teste, teste"
                            devs={3}
                            time={5}
                        />
                    </div>
                </>
            </div>
             */}
    </div>
  );
};
