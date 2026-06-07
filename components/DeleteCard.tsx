interface DeleteCardProps {
  cardOpen: boolean,
  formTitle: string,
  error: string
  onCancel: () => void,
  onConfirm: () => void
}

export default function DeleteCard({ cardOpen, formTitle, error, onCancel, onConfirm }: DeleteCardProps) {
  const handleCancel = () => {
    onCancel()
  }

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <div
      className={`${cardOpen=== true ? 'block' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center bg-black/60`}
      onClick={handleCancel}
    >
      <div
        className="bg-stone-100 border border-gray-300 rounded-2xl p-8 w-full max-w-md mx-4 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${error !== '' ? 'block' : 'hidden'} bg-red-500/20 text-red-800 p-2 mb-4 border rounded-md`}>
            <p>{error}</p>
        </div>
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        {/* Text */}
        <h2 className="text-zinc-800 text-xl font-semibold text-center">{formTitle}</h2>
        <p className="text-zinc-600 text-sm text-center leading-relaxed">This will permanently remove the form, all of its fields and it's responses. This action can't be undone.</p>

        {/* Buttons */}
        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={handleCancel}
            className="cursor-pointer text-zinc-800 flex-1 py-2.5 rounded-xl bg-stone-200 border border-white/10 text-sm hover:bg-stone-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="cursor-pointer flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-sm font-medium transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}