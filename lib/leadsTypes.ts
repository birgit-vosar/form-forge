export interface LeadRow {
    form_id: number
    title: string,
    topic: string,
    is_published: boolean,
    response_id: number,
    submitted_at: string
}

export type LeadsData = LeadRow[]

export interface ResponseLeadsRow {
    answer_id: number,
    field_id: number,
    response_id: number,
    value: string
}

export interface ResponseLeadsData {
    id: number,
    submitted_at: string,
    answers: ResponseLeadsRow[]
}