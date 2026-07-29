




export default function OptionsListEditor() {
    return (
        <div className='flex flex-col w-full gap-2 mx-4 my-3'>
            <p className='uppercase font-sans font-semibold text-black/75 text-xs'>Options</p>
            <div className="flex gap-1 justify-center">
                <input className="py-2 w-full px-2 border rounded-xs border-stone-300 focus:outline-stone-500 bg-white"
                    placeholder='Enter a label...'></input>
                <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4 text-gray-800/75 cursor-pointer hover:text-black hover:scale-105">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg></button>
            </div>
            <button className="w-full flex justify-center border rounded-xs border-stone-300 py-2 bg-[#dddbdb] hover:bg-[#d1cfcf] active:scale-101">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
    )
}
