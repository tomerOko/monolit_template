import { z } from "zod";
import { country_codes_array, roles_array } from "./user_objects_as_arrays";



const basic_user_request = z.object({
  country:z.enum(country_codes_array),
  email: z.string().email(),
  image: z.string().url().optional(),
  name: z.string(),
  role: z.enum(roles_array).optional()
})

const user_id_filter = z.object({
  user_id: z.string().uuid()
})


export const create_user_schema = z.object({
  body: basic_user_request.strict()
});


export const get_user_by_id_schema = z.object({
  params: user_id_filter
});


export const update_user_changable_properties_schema = z.object({
  body: basic_user_request.omit({role: true}).partial().strict(),
  params: user_id_filter 
})


export const delete_user_by_id_schema = z.object({
  params: user_id_filter
});


export const change_user_role_schema = z.object({
  body: z.object({
    user_id: z.string().uuid(),
    role: z.enum(roles_array)
  }),
  params: z.object({
    authorized_moderator_id: z.string().uuid()
  }) 
})


