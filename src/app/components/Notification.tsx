import React, { useEffect, useState } from "react";

export const Notification = ({
    isOpen, onClose, children
}: {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}
) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
            window.addEventListener("keydown", handleKeyDown);
        };
    }, [onClose])

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
            <div className="modal-content bg-main-text-color dark:bg-gray-three rounded-lg px-3 py-2 xl:w-[574px] lg:w-[574px] md:w-[574px] max-w-[574px] shadow-lg transition-transform duration-300">
                <div className="modal-body px-9 py-5">
                    {children}
                </div>
            </div>
        </div>
    )
}