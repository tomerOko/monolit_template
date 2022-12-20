import { StructuedErrorTypes, stucture_an_existing_error } from "../errors/error_factory";
import { getTransactionId } from "../middleware/custom/async_storage";
import { logger } from "./logger";

export type WrapOptions = {
    dont_trow_if_error?: boolean,
    error_return_value?: any,
    hide_result?: boolean,
    hide_error?: boolean,
    start_log_addition?: string
}

export type WrapProps = {
    name: string,
    options?: WrapOptions,
    error_structure?: StructuedErrorTypes
}

export const wrapSync = < Z extends(...args: any[]) => any , X = ReturnType < Z > > (props: WrapProps, fn: ()=> X): X=> {
    const log_prefix = buildLogPrefix(props)
    try {
        logger.info(`${log_prefix}, message: 'start ${props.options?.start_log_addition ? props.options.start_log_addition : ''}' `)
        const result = fn()
        logger.info(`${log_prefix}, message: 'end ${ props.options?.hide_result ? '': result }'`)
        return result
    } catch (error) {
        return hanle_error(props, error, log_prefix)
    }
};

export const wrap = async <Z extends (...args: any[]) => Promise<any>, X = ReturnType < Z > > (props: WrapProps, fn: ()=> X): Promise<X> => {
    const log_prefix = buildLogPrefix(props)
    try {
        logger.info(`${log_prefix}, message: 'start ${props.options?.start_log_addition ? props.options.start_log_addition : ''}' `)
        const result = await fn()
        logger.info(`${log_prefix}, message: 'end ${ props.options?.hide_result ? '': result }'`)
        return result as X
    } catch (error) {
        return hanle_error(props, error, log_prefix)
    }
};

const hanle_error = (props: WrapProps, error: unknown, log_prefix:string) => {
    logger.error(`${log_prefix}, message: 'error ${ props.options?.hide_error ? '' : error }'`)
    if (props.options?.dont_trow_if_error) {
        return dontThrow(props);
    } else {
        error = stucture_an_existing_error(error, props.error_structure)
        throw error
    }
}

const dontThrow = (props: WrapProps) => {
    const error_return_value = props.options?.error_return_value ? props.options.error_return_value : null;
    return error_return_value;
}

const buildLogPrefix = (props: WrapProps): string=>{
    const transacion_id = getTransactionId();
    const log_prefix = `transactionId: '${transacion_id}', location: '${props.name}'`
    return log_prefix
}


