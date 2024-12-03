export default function WorkingLoader() {
    return (
        <div className="loading my-5 bg-main-text-color dark:bg-gray-five rounded-md w-full">
            <div className="header flex justify-between items-center px-4 py-2">
                <h2 className='text-[20px] text-blue-one flex gap-2 items-center'>
                    <span className="material-symbols-outlined text-[32px] text-gray-nine font-extralight">
                        radio_button_unchecked
                    </span>
                    Noctua está trabajando...
                </h2>
                <div className="flex gap-1">
                    <span className="material-symbols-outlined text-[32px] text-gray-nine font-extralight">
                        radio_button_unchecked
                    </span>
                    <span className="material-symbols-outlined text-[32px] text-gray-nine font-extralight">
                        radio_button_unchecked
                    </span>
                    <span className="material-symbols-outlined text-[32px] text-gray-nine font-extralight">
                        radio_button_unchecked
                    </span>
                </div>
            </div>

            <hr className='h-[1px] border-0 w-full bg-gray-three mb-3' />

            <div className="body px-12 py-2">
                <div className='bg-gray-one dark:bg-gray-nine h-[12px] w-full rounded-full mb-2'></div>
                <div className='bg-gray-one dark:bg-gray-nine h-[12px] w-2/3 rounded-full mb-2'></div>
                <div className='bg-gray-one dark:bg-gray-nine h-[12px] w-4/5 rounded-full mb-2'></div>
            </div>
        </div>
    )
}