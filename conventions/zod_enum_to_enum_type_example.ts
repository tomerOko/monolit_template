import { z } from "zod";

const some_list_of_values={ //if some_list_of_values will have type like 'some_list_of_values:Record<string,any>' the zod infer will not work
    "a":1,
    "b":2,
    "c":3
} as const

type TypeOfThisValues = keyof typeof some_list_of_values

export const the_list_of_values_as_array : [TypeOfThisValues, ... TypeOfThisValues[]] = [
    Object.keys(some_list_of_values)[0] as TypeOfThisValues,
    ...Object.keys(some_list_of_values).slice(1) as TypeOfThisValues[]
]

const zod_enum_to_enforce_the_list_of_values = z.enum(the_list_of_values_as_array)

const some_zod_validation = z.object({
    key1: z.string(),
    key2: z.number(),
    key3: zod_enum_to_enforce_the_list_of_values
})

type type_of_that_zod_validation = z.infer<typeof some_zod_validation>

const request_body:type_of_that_zod_validation = {
    key1: "somthing",
    key2: 1,
    key3: "a"
}