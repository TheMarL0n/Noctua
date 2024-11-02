import { useState } from "react"

export default function AddFolderForm() {

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
                    <div className="mb-6 flex bg-main-text-color dark:bg-main-c items-center pr-4 rounded max-w-full">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="Escribe el nombre de la carpeta"
                            className="block w-full border-0 rounded p-4 text-main-c dark:text-main-text-color text-custom-regular shadow-sm bg-main-text-color dark:bg-main-c placeholder:text-main-c placeholder:dark:text-main-text-color focus:outline-0 focus:ring-0"
                            onChange={handleChange}
                        />
                        <span className="material-symbols-outlined text-main-c dark:text-main-text-color text-[25px]">
                            folder
                        </span>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-one border-dashed rounded-lg cursor-pointer bg-main-text-color dark:bg-main-c dark:hover:bg-secundary-c dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center p-6">
                                <span className="material-symbols-outlined text-gray-three text-[90px]">
                                    note_add
                                </span>
                                <p className="text-main-c dark:text-main-text-color text-custom-regular text-center">Arrastra tus archivos aquí o selecciona uno de tu <br /> computadora <span className="text-blue-one">aquí</span></p>
                                <hr className="h-[1px] bg-gray-two w-full border-0 my-3" />
                                <p className="text-main-c dark:text-main-text-color text-[12px] text-center">Puedes subir archivos de Word, MP3, MP4, Txt y PDF no mayores a 30MB</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                        </label>
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
                                Crear Carpeta
                            </button>
                        }
                    </div>
                </form>
            }
        </div>
    );
}