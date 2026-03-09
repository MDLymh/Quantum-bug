export type SimplifiedReport = {
    status:string,
    ticket:string,
    title:string
}

export type ExtendedReport ={
    category:string,
    created_at:string,
    description:string,
    product:string,
    status:string,
    ticket:string,
    title:string,
    updated_at:string,
    images:TicketEvidenceLink[],
    comments:ReportComment[]

}

export type TicketEvidenceLink = {
    link:string,
    name:string,
}

export type ReportComment={
    content:string,
    time:string,
    user:string,
    id:bigint
}