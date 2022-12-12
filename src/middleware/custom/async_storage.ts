import { NextFunction, Request, Response } from "express";
import { AsyncLocalStorage } from 'async_hooks'
import {v4 as genereateID} from 'uuid'
import { create_error } from '../../errors/error_factory';

const asyncLocalStorage = new AsyncLocalStorage<Record<string, any>>();

export const initializeAsiyncLocalStorage =  (req:Request, res: Response, next: NextFunction) => {
    asyncLocalStorage.enterWith({})
    next()
}

export const addTransactionIdToRequestAsyncStorage = (req:Request, res: Response, next: NextFunction) => {
    const transactionId = req.headers['transactionId'] || genereateID();
    const async_store = getAsyncStore();
    async_store.transactionId = transactionId
    next();
};

export const getTransactionId = (): string => {
    try {
        const async_store = getAsyncStore();
        const transacion_id = async_store.transactionId
        return transacion_id as string
    } catch (error) {
        return "this opperation dose not have transactionID"
    }

}

export const getAsyncStore = () => {
    const async_store = asyncLocalStorage.getStore();
    if (!async_store) throw create_error("async storage not initialized");
    return async_store;
}
