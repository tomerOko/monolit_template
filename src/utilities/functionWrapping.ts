import { logger } from "./logger";

export type WrapOptions = {
    dont_trow_if_error?: boolean
    error_return_value?: any
    hide_params?: boolean
    hide_result?: boolean
    hide_error?: boolean
}

export const wrapSync = < T extends(...args: any[]) => any > (fn: T, params: Parameters < T > , fn_name: string, options ? : WrapOptions): ReturnType < T > => {
    try {
        logger.info(`${fn_name} - start ${ options?.hide_params ? '': params }`)
        const result = fn(...params)
        logger.info(`${fn_name} - end ${ options?.hide_result ? '': result }`)
        return result
    } catch (error) {
        logger.error(`${fn_name} - error ${ options?.hide_error ? '' : error }`)
        if (options?.dont_trow_if_error) {
            const error_return_value = options?.error_return_value ? options.error_return_value : null
            return error_return_value
        } else {
            throw error
        }
    }
};


export const wrap = async <T extends (...args: any[]) => Promise<any>> (fn: T, params: Parameters < T > , fn_name: string, options ? : WrapOptions): Promise <ReturnType < T >> => {
    try {
        logger.info(`${fn_name} - start ${ options?.hide_params ? '': params }`)
        const result = await fn(...params)
        logger.info(`${fn_name} - end ${ options?.hide_result ? '': result }`)
        return result
    } catch (error) {
        logger.error(`${fn_name} - error ${ options?.hide_error ? '' : error }`)
        if (options?.dont_trow_if_error) {
            const error_return_value = options?.error_return_value ? options.error_return_value : null
            return error_return_value
        } else {
            throw error
        }
    }
};

