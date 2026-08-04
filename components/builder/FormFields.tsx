import { Field } from "@/lib/fieldTypes"
import FieldRenderer from "./FieldRenderer"
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import SortableFieldRow from "./SortableFieldRow"

interface FormFieldsType {
    fields: Field[],
    setFields: (fields: Field[]) => void
    selectedFieldId: number | null,
    onDelete: (fieldId: number) => void,
    onSelect: (fieldId: number) => void,
}

export default function FormFields({ fields, setFields, selectedFieldId, onDelete, onSelect }: FormFieldsType) {
    const sensors = useSensors(useSensor(PointerSensor))

    function handleDragEnd(e: DragEndEvent) {
        const { active, over } = e
        if (!over || active.id === over.id) return

        const oldIndex = fields.findIndex((field) => field.id === active.id)
        const newIndex = fields.findIndex((field) => field.id === over.id)

        setFields(arrayMove(fields, oldIndex, newIndex))
    }

    if (fields.length === 0) {
        return (
            <div className='border-2 px-2 py-6 mt-2 rounded border-[#84c9b1] border-dashed'>
                <label className='text-[#1d7e5b] font-mono text-xs'>Click a field type on the left to get started.</label>
            </div>
        )
    }
    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={fields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
                <div>
                    {
                        fields.map((field) => (
                            <SortableFieldRow key={field.id} field={field} selectedFieldId={selectedFieldId} onSelect={onSelect} onDelete={onDelete} />
                        ))
                    }
                </div>
            </SortableContext>
        </DndContext>
    )
}