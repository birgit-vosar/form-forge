export interface LeadRow {
    form_id: number
    title: string,
    is_published: boolean,
    response_id: number,
    submitted_at: number
}

export type LeadsData = LeadRow[]