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
    formId: number
}

export default function FormFields({ fields, setFields, selectedFieldId, onDelete, onSelect, formId }: FormFieldsType) {
    const sensors = useSensors(useSensor(PointerSensor))

    async function handleDragEnd(e: DragEndEvent) {
        const { active, over } = e
        if (!over || active.id === over.id) return

        const oldIndex = fields.findIndex((field) => field.id === active.id)
        const newIndex = fields.findIndex((field) => field.id === over.id)

        const newArray = arrayMove(fields, oldIndex, newIndex)
        console.log(newArray)
        setFields(newArray)

        const fieldOrder = newArray.map((field, index) => ({ id: field.id, order_index: index }))

        try {
            await fetch(`/api/forms/${formId}/fields/reorder`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fieldOrder }),
            })
        } catch(err) {
            console.error('Failed to save field order', err)
        }
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