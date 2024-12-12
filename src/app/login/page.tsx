
"use client"

import LoginForm from "../components/LoginForm"
import RecoverPassForm from "../components/RecoverPassForm"
import { Modal } from "../components/Modal"
import { useState } from "react"

export default function LoginPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="xl:flex lg:flex h-screen relative">
            <div className="absolute top-2 right-2 z-10">
                <img
                    src="/imgs/black.png"
                    alt="Black Logo"
                    width={100}
                    height={30}
                    className="mb-16"
                />
            </div>

            <div className="bg-left-hero-pattern bg-no-repeat bg-cover flex flex-col justify-center items-center p-24 xl:w-3/5 w-full">
                <div>
                    <h1 className="text-main-text-color text-custom-large/[60px]">La chispa que enciende<br /> <strong>infinitas posibilidades</strong><br /> en materia legal.</h1>
                    <p className="text-main-text-color text-custom-medium mt-16">Un mundo más inteligente, impulsado por la IA</p>
                </div>
            </div>

            <div className="bg-white dark:bg-secundary-c flex flex-col justify-center items-center p-24 relative xl:w-2/5 w-full">
                <div>
                    <img
                        src="/logo.svg"
                        alt="Logo"
                        width={254}
                        height={53}
                        
                        className="mb-16 hidden dark:block"
                    />
                    <img
                        src="/logo-dark.svg"
                        alt="Logo"
                        width={254}
                        height={53}
                        
                        className="mb-16 block dark:hidden"
                    />
                    <h3 className="text-main-c dark:text-main-text-color text-custom-medium">Inicia Sesión</h3>
                    <p className="text-main-c dark:text-main-text-color text-custom-regular">Utiliza los datos que te enviamos por correo<br /> electrónico.</p>

                    <div className="mt-4 xl:w-[399px] lg:w-[399px] max-w-full">

                        <LoginForm />

                        <div className="text-sm">
                            <button onClick={() => setIsModalOpen(true)} className="font-semibold text-main-c dark:text-main-text-color hover:text-indigo-500 mt-2 underline block ease-in-out duration-300 hover:text-blue-one">
                                Olvide mi contraseña
                            </button>
                            <Modal title="Recuperar contraseña" isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
                                <RecoverPassForm />
                            </Modal>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between absolute bottom-2 p-3 w-full left-0">
                    <p className="text-gray-one textcustom-regular text-custom-regular">Noctua® Ai, Derechos reservados, 2024.</p>
                    <div className="flex gap-2"><a className="text-blue-one underline textcustom-regular text-custom-regular ease-in-out duration-300 hover:text-gray-seven dark:text-white-one" href="#">Política de prevacidad</a><a className="text-blue-one underline textcustom-regular text-custom-regular ease-in-out duration-300 hover:text-gray-seven dark:text-white-one" href="#">Uso de Datos</a></div>
                </div>
            </div>
        </div>

    )
}