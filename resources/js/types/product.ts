export type SimplifiedProduct= {
    id: BigInt,
    name:string,
    description:string,
    last_stable_version:string,
    category:Category,
}

export type Category={
    id:BigInt,
    name:string
}

export type ExtendedProduct={
    id: BigInt,
    name:string,
    description:string,
    last_stable_version:string,
    current_version:string
    category:Category,
    versions:Version[]
}

export type Version={
    id:BigInt,
    is_stable:boolean,
    version:string,
    change_log_url:string,
    created_at:string,

}