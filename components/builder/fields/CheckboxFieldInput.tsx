import { FieldInputProps } from "@/lib/fieldTypes";

export default function CheckboxFieldInput({ field } : FieldInputProps) {
    return(
        <div className="inline-flex items-center">
  <label
    className="relative flex cursor-pointer items-center"
    htmlFor="check-2"
  >
    <input
      type="checkbox"
      id="check-2"
      defaultChecked
      className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all hover:shadow-md checked:border-slate-800 checked:bg-slate-800"
    />
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5"
        viewBox="0 0 20 20"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        />
      </svg>
    </span>
  </label>

  <label
    className="ml-2 cursor-pointer text-sm text-slate-600"
    htmlFor="check-2"
  >
    {field.placeholder ?? 'Check this'}
  </label>
</div>
    )
}