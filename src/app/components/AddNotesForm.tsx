import { useState } from "react"
import axios from "axios";
import Image from "next/image"

export default function AddNotesForm({ slug, procesoOcarpeta, father }: any) {

    const [success, setSuccess] = useState(false);
    const [enabler, setEnabler] = useState(false);
    const [note, setNote] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //enable send button if textarea change
    const handleChange = (e: any) => {
        setEnabler(true);
        setNote(e.target.value);
    }

    //send form info
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true);

        const saveParam = { key: 'nota', paramId: note, keyQuestion: father, paramPregunta: procesoOcarpeta, urlSlug: slug };
        await axios.post('/api/auth/endpoint', saveParam).then(response => {
            setIsLoading(false);
            setSuccess(true);
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        });
    }

    return (
        <div>
            {
                isLoading ?
                    <div className="flex flex-col items-center justify-center mb-6">
                        <Image
                            src="/loading.svg"
                            alt="loading"
                            width={100}
                            height={100}
                            priority
                        />
                    </div>
                    :
                    success ?
                        <div className="flex flex-col items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-blue-one text-[90px] text-center">
                                check
                            </span>
                            <p className="text-center text-main-c dark:text-main-text-color text-custom-regular">La nota ha sido añadida satisfactoriamente</p>
                        </div>
                        :
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6 flex bg-main-text-color dark:bg-main-c items-center rounded max-w-full">
                                <textarea
                                    id="note"
                                    name="note"
                                    required
                                    autoComplete="note"
                                    placeholder="Escribe la nota aquí"
                                    className="block w-full border-0 rounded p-4 text-gray-five dark:text-main-text-color text-custom-regular shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-gray-five placeholder:dark:text-main-text-color focus:outline-0 focus:ring-0"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex justify-between">
                                {enabler ?
                                    <button
                                        type="submit"
                                        className="text-secundary-c mt-12 ml-auto flex justify-center bg-blue-one py-3 px-14 text-[15px] ease-in-out duration-300 hover:bg-main-c hover:text-blue-one"
                                    >
                                        Crear Nota
                                    </button>
                                    :
                                    <button
                                        disabled
                                        className="text-gray-one mt-12 ml-auto flex justify-center bg-gray-two py-3 px-14 text-[15px]"
                                    >
                                        Crear Nota
                                    </button>
                                }
                            </div>
                        </form>
            }
        </div>
    );
}