import React, { useEffect, useState } from "react";

export const Modal = ({
    title, isOpen, onClose, children
}: {
    title: string,
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
            <div className="modal-content bg-white dark:bg-gray-three rounded-lg px-3 py-2 xl:w-[574px] lg:w-[574px] md:w-[574px] max-w-[574px] shadow-lg transition-transform duration-300">
                <div className="modal-header justify-between flex border-b border-gray-five">
                    <p className="text-[20px] font-light text-gray-five dark:text-main-text-color pb-1">{title}</p>
                    <button onClick={onClose}><span className="material-symbols-outlined text-[25px] font-light text-main-text-color">
                        close
                    </span></button>
                </div>
                <div className="modal-body p-9">
                    {children}
                </div>
            </div>
        </div>
    )
}