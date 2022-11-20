export type WrapOptions = {
    dont_trow_if_error?: boolean
    error_return_value?: any
}

export const wrap = <T extends (...args: any[]) => any> (fn: T, args:Parameters<T>, fn_name:string, options?:WrapOptions): ReturnType<T> => {
    try {
        console.log(fn_name, "start")
        const result = fn(...args)
        console.log(fn_name, "end")
        return result 
    } catch (error) {
        console.error(fn_name, error);
        if (options?.dont_trow_if_error) {
            return options?.error_return_value
        }else{
            throw error
        }
    }
};

// const wrapAsunc = <T>(fn: T) => async (msg: T) => {
//     try {
//         await fn(msg);
//     } catch (err) {
//         console.log(err.message);
//     }
// };


// function wrapFunction<TArgs extends any[], TReturn>(targetFunction: (...parameters: TArgs) => TReturn): (...parameters: TArgs) => TReturn {
//     return (...parameters: TArgs) => {
//       console.log(`Hello, what is your name?`);
//       return targetFunction(...parameters);
//     };
//   }
  
//   ArgsType<T>

// type Person = ReturnType<typeof createPerson>
