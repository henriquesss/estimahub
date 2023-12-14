"use client"

import React, { useState, useContext } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { db } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../../contexts/AuthContext';

export const CreateEstimativeModal = ({ isOpen, onOpenChange }) => {
    const { user } = useContext(AuthContext);

    const [description, setDescription] = useState("");
    const [stackString, setStackString] = useState("");
    const [time, setTime] = useState(0);
    const [devs, setDevs] = useState(0);

    // References to collections
    const estimativesCollectionRef = collection(db, "estimatives");

    const handleCreate = async (onClose) => {
        try {
            const createdEstimative = await addDoc(estimativesCollectionRef, {
                description,
                stack: stackString.split(','),
                time,
                devs,
                createdAt: new Date(),
                createdBy: user.uid,
                createdByEmail: user.email
            })

            onClose()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Criar estimativa</ModalHeader>
                            <ModalBody>
                                <p>
                                    Preencha sua experiência da forma mais precisa possível. Sua contribuição é muito importante para comunidade :)
                                </p>
                                <textarea className="border-1 p-2 rounded" type="text" placeholder="descrição" onChange={event => setDescription(event.target.value)} />
                                <input className="border-1 p-2 rounded" type="text" placeholder="tecnologias (dividas por espaço)" onChange={event => setStackString(event.target.value)} />
                                <input className="border-1 p-2 rounded" type="number" min={1} placeholder="tempo (em dias)" onChange={event => setTime(event.target.value)} />
                                <input className="border-1 p-2 rounded" type="number" min={1} placeholder="devs" onChange={event => setDevs(event.target.value)} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button className="bg-pink-600 text-white" onPress={() => handleCreate(onClose)}>
                                    Criar estimativa
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
