import React from 'react';

const Header: React.FC = async () => {
    return (
        <div className="flex justify-between items-center gap-2.5 mx-6 h-14">
                <div className="flex flex-grow gap-4 items-center h-full border rounded-full shadow-lg p-2 pl-4">
                    <img src="/icons/search-icon.svg" alt="Airbnb Pixel" className="w-5 h-5" />
                    <input type="text" className="w-full h-full placeholder:font-semibold placeholder:text-gray-500 placeholder:text-sm" placeholder="Para onde?" />
                </div>
            <button className="relative w-10 h-10 rounded-full border border-[#b0b0b0]">
                <img src="/icons/filter-icon.svg" alt="Menu" className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 size-4" />
            </button>
        </div>
    )
}

export default Header;