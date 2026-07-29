




export default function OptionsListEditor() {
    return (
        <div className='flex flex-col w-full gap-2 mx-4 my-3'>
                    <p className='uppercase font-sans font-semibold text-black/75 text-xs'>Options</p>
                    <div className="flex gap-1 justify-center">
                        <input className="py-2 w-full px-2 border rounded-xs border-stone-300 focus:outline-stone-500 bg-white"
                            placeholder='Enter a label...'></input>
                        <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4 text-gray-800/75 cursor-pointer hover:text-teal-800 hover:scale-115">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg></button>
                    </div>
                </div>
    )
}
