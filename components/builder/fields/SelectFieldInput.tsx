import { FieldInputProps } from "@/lib/fieldTypes";

export default function SelectFieldInput({ field }: FieldInputProps) {
    return (
        <div>
            <select className="py-1 w-full px-2 border rounded-sm border-[#8ed0b8] bg-[#dbf1e9] text-sm">
                <option value="">{field.placeholder ?? '-- Please choose an option --'}</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="hamster">Hamster</option>
                <option value="parrot">Parrot</option>
                <option value="spider">Spider</option>
                <option value="goldfish">Goldfish</option>
            </select>
        </div>
    )
}