import { useState } from "react"

export default function RecoverPassForm() {

    const [success, setSuccess] = useState(false);
    const [enabler, setEnabler] = useState(false);
    const [credentials, setCredentials] = useState({
        email: '',
    });

    const handleChange = (e: any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
        setEnabler(true);
    }

    const handleSubmit = () => { setSuccess(true) }

    return (
        <div>
            {success ?
                <div className="flex flex-col items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-blue-one text-[90px] text-center">
                        check
                    </span>
                    <p className="text-center text-main-c dark:text-main-text-color text-custom-regular">Te hemos enviado un correo, sigue las instrucciones.</p>
                </div>
                :
                <form onSubmit={handleSubmit}>
                    <div className="mt-2 flex bg-main-text-color dark:bg-main-c items-center pr-4 rounded max-w-full">
                        <input
                            id="username"
                            name="username"
                            type="email"
                            required
                            autoComplete="username"
                            placeholder="Escribe tu correo electrónico"
                            className="block w-full border-0 rounded p-4 text-main-c dark:text-main-text-color text-custom-regular shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-main-c placeholder:dark:text-main-text-color focus:outline-0 focus:ring-0"
                            onChange={handleChange}
                        />
                        <span className="material-symbols-outlined text-main-c dark:text-main-text-color text-[25px]">
                            mail
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="text-secundary-c mt-12 flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one"
                        >
                            Cancelar
                        </button>

                        {enabler ?
                            <button
                                type="submit"
                                className="text-secundary-c mt-12 ml-auto flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one"
                            >
                                Enviar
                            </button>
                            :
                            <button
                                disabled
                                className="text-gray-one mt-12 ml-auto flex justify-center bg-gray-two py-3 px-14 text-[15px]"
                            >
                                Enviar
                            </button>
                        }
                    </div>
                </form>
            }
        </div>
    );
}