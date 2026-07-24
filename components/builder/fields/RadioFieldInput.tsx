import { FieldInputProps } from "@/lib/fieldTypes";

export default function RadioFieldInput({ field } : FieldInputProps) {
    return(
        <div className="relative flex flex-col border rounded-sm border-[#8ed0b8] bg-[#dbf1e9]">
  <nav className="flex min-w-[240px] flex-col gap-1 p-2">
    <div
      role="button"
      className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
    >
      <label
        htmlFor="react-vertical"
        className="flex w-full cursor-pointer items-center px-3 py-2"
      >
        <div className="inline-flex items-center">
          <label
            className="relative flex cursor-pointer items-center"
            htmlFor="react-vertical"
          >
            <input
              name="framework"
              type="radio"
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 transition-all checked:border-slate-400"
              id="react-vertical"
              defaultChecked
            />
            <span className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-slate-800 opacity-0 transition-opacity duration-200 peer-checked:opacity-100"></span>
          </label>
          <label
            className="ml-2 cursor-pointer text-sm text-black"
            htmlFor="react-vertical"
          >
            First
          </label>
        </div>
      </label>
    </div>

    <div role="button"
      className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
      <label htmlFor="vue-vertical"
        className="flex w-full cursor-pointer items-center px-3 py-2">
        <div className="inline-flex items-center">
          <label className="relative flex cursor-pointer items-center"
            htmlFor="vue-vertical">
            <input name="framework" type="radio"
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 transition-all checked:border-slate-400"
              id="vue-vertical"/>
            <span className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-slate-800 opacity-0 transition-opacity duration-200 peer-checked:opacity-100"></span>
          </label>
          <label
            className="ml-2 cursor-pointer text-sm text-black"
            htmlFor="vue-vertical">
            Second
          </label>
        </div>
      </label>
    </div>

    <div role="button"
      className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
      <label
        htmlFor="svelte-vertical"
        className="flex w-full cursor-pointer items-center px-3 py-2">
        <div className="inline-flex items-center">
          <label
            className="relative flex cursor-pointer items-center"
            htmlFor="svelte-vertical">
            <input
              name="framework"
              type="radio"
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 transition-all checked:border-slate-400"
              id="svelte-vertical"/>
            <span className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-slate-800 opacity-0 transition-opacity duration-200 peer-checked:opacity-100"></span>
          </label>
          <label
            className="ml-2 cursor-pointer text-sm text-black"
            htmlFor="svelte-vertical">
            Third
          </label>
        </div>
      </label>
    </div>
  </nav>
</div>
    )
}