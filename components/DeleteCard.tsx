

export default function DeleteCard() {
    return (
        <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onCancel}
    >
      <div
        className="bg-[#0f1623] border border-white/10 rounded-2xl p-8 w-full max-w-md mx-4 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        {/* Text */}
        <h2 className="text-white text-xl font-semibold text-center">{title}</h2>
        <p className="text-gray-400 text-sm text-center leading-relaxed">{message}</p>

        {/* Buttons */}
        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-white text-sm hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
    )
}