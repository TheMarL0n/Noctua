"use client"

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import 'material-symbols';

export default function Searchbar() {
    return (
        

                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <MenuButton className="inline-flex w-full justify-center items-center gap-x-1.5 bg-secundary-c border border-gray-three rounded-lg px-2 py-[9px] ring-gray-300 hover:bg-gray-50">
                            <span className="material-symbols-outlined text-[32px] text-gray-four">
                                gavel
                            </span>
                            <span className="material-symbols-outlined text-[25px] text-blue-one font-extralight">
                                keyboard_arrow_down
                            </span>
                        </MenuButton>
                    </div>

                    <MenuItems
                        transition
                        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-three shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        <div className="py-1">
                            <MenuItem>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                >
                                    Opcion 1
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                >
                                    Opcion 2
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                >
                                    Opcion 3
                                </a>
                            </MenuItem>
                            <form action="#" method="POST">
                                <MenuItem>
                                    <button
                                        type="submit"
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                    >
                                        Opcion 4
                                    </button>
                                </MenuItem>
                            </form>
                        </div>
                    </MenuItems>
                </Menu>

    )
}