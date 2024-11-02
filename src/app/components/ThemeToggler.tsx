import { useEffect, useState } from "react"

export default function ThemeToggler() {

    const [theme, setTheme] = useState<any>(null);

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else setTheme('light');
    }, [])

    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setTheme('light');
          } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
          }
    }

    return (
        <div className="toggle mb-5 bg-gray-three rounded-md px-4 py-3 fixed bottom-0 right-20 drop-shadow-sm">
            <label className="inline-flex gap-5 items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onClick={toggleTheme} />
                <div
                    className="relative w-11 h-[14px] bg-white-one peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[-3px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="material-symbols-outlined text-[25px] text-white text-w font-extralight">
                    {
                        (theme === 'light') ? ('light_mode') : ('mode_night')
                    }
                </span>
            </label>
        </div>
    )
}