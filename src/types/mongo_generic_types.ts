import { Filter, Sort, UpdateFilter } from "mongodb"

//generic results
export type CreateSinleResult = {
    //TODO: what will the service need and what the mongodb packge provides
    }
    export type CreateManyResult = {
      inserted:number,
      blocked_by_index: number
    }
    export type ReadManyResult<T> = Array<T>
    export type ReadSinleResult<T> = T | null
    export type UpdateSinleResult = {
      matched:boolean,
    }
    export type UpdateManyResult = {
      mutched:number,
      updated:number,
    }
    export type DeleteSingleResult = {
    //TODO: what will the service need and what the mongodb packge provides
    } 
    export type DeleteManyResult = {
    //TODO: what will the service need and what the mongodb packge provides
    
    } 
    
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
      update_properties: UpdateFilter<T>,
      upsert:boolean,
    }
    export type DeleteQuery<T> = BasicQuery<T> 
    