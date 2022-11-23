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
    options?: WrapOptions
}

export const wrapSync = < T extends(...args: any[]) => any > (props: WrapProps, fn: ()=> ReturnType < T >): ReturnType < T > => {
    try {
        logger.info(`${props.name} - start ${ props.options?.start_log_addition ? props.options.start_log_addition: '' }`)
        const result = fn()
        logger.info(`${props.name} - end ${ props.options?.hide_result ? '': result }`)
        return result
    } catch (error) {
        logger.error(`${props.name} - error ${ props.options?.hide_error ? '' : error }`)
        if (props.options?.dont_trow_if_error) {
            const error_return_value = props.options?.error_return_value ? props.options.error_return_value : null
            return error_return_value
        } else {
            throw error
        }
    }
};


export const wrap = async <T extends (...args: any[]) => Promise<any>> (props: WrapProps, fn: ()=>ReturnType < T >): Promise <ReturnType < T >> => {
    try {
        logger.info(`${props.name} - start ${ props.options?.start_log_addition ? props.options.start_log_addition: '' }`)
        const result = await fn()
        logger.info(`${props.name} - end ${ props.options?.hide_result ? '': result }`)
        return result
    } catch (error) {
        logger.error(`${props.name} - error ${ props.options?.hide_error ? '' : error }`)
        if (props.options?.dont_trow_if_error) {
            const error_return_value = props.options?.error_return_value ? props.options.error_return_value : null
            return error_return_value
        } else {
            throw error
        }
    }
};

