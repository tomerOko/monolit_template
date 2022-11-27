import { Filter, Sort, UpdateFilter } from "mongodb"


//generic queries
export type BasicQuery<T> = {
  collection_name:string,
  filter: Filter<T>,
}
export type CreateSingleQuery<T> = {
  collection_name:string,
  value:T
}
export type CreateManyQuery<T> = {
  collection_name:string,
  values:T[]
}
export type ReadSingleQuery<T> = BasicQuery<T>
export type ReadManyQuery<T> = BasicQuery<T> & {
  sort?: Sort,
  limit?: number
}
export type UpdateQuery<T> = BasicQuery<T> & {
  update_values: Partial<T>,
  upsert:boolean,
}
export type DeleteQuery<T> = BasicQuery<T> 


//generic results
export type CreateSinleResult<T> = {
  inserted:boolean
}
export type CreateManyResult = {
  inserted:number
}
export type ReadManyResult<T> = Array<T>
export type ReadSinleResult<T> = T | null
export type UpdateSinleResult = {
  matched:boolean,
  updated:boolean,
  upserted:boolean
}
export type UpdateManyResult = {
  mutched:number,
  updated:number,
  upserted:number
}
export type DeleteSingleResult = {
  deleted:boolean,
} 
export type DeleteManyResult = {
  deleted_count:number
} 




