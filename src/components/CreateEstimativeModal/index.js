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
    const [errors, setErrors] = useState({
        description: "",
        stack: "",
        devs: "",
        time: ""
    });

    // References to collections
    const estimativesCollectionRef = collection(db, "estimatives");

    const handleCreate = async (onClose) => {
        try {
            // Validate form fields
            const newErrors = {};
            if (!description) newErrors.description = 'Describe the estimate';
            if (!stackString) newErrors.stack = 'Write the tech stack';
            if (!devs) newErrors.devs = 'Report how many devs are involved';
            if (!time) newErrors.time = 'Report how many days this estimate last';

            // If there are errors, set them in the state
            if (Object.keys(newErrors).length > 0) setErrors(newErrors);
            else {
                // Everything is ok

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
            }
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
                            <ModalHeader className="flex flex-col gap-1">Create estimate</ModalHeader>
                            <ModalBody>
                                <p>
                                    Fill in your experience as accurately as possible. Your contribution is very important to the community
                                </p>
                                {errors.description && (<p className='text-red-500'>{errors.description}</p>)}
                                <textarea className="border-1 p-2 rounded" type="text" placeholder="description" onChange={event => setDescription(event.target.value)} />
                                {errors.stack && (<p className='text-red-500'>{errors.stack}</p>)}
                                <input className="border-1 p-2 rounded" type="text" placeholder="technologies (split by comma)" onChange={event => setStackString(event.target.value)} />
                                {errors.time && (<p className='text-red-500'>{errors.time}</p>)}
                                <input className="border-1 p-2 rounded" type="number" min={1} placeholder="time (days)" onChange={event => setTime(event.target.value)} />
                                {errors.devs && (<p className='text-red-500'>{errors.devs}</p>)}
                                <input className="border-1 p-2 rounded" type="number" min={1} placeholder="devs" onChange={event => setDevs(event.target.value)} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button className="bg-pink-600 text-white" onPress={() => handleCreate(onClose)}>
                                    Create estimate
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
