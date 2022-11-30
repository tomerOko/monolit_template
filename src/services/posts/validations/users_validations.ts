import { z } from "zod";
import { country_codes_array, roles_array } from "./post_objects_as_arrays";





const basic_post_request = z.object({
  country:z.enum(country_codes_array),
  email: z.string().optional(),
  image: z.string().url().optional(),
  name: z.string(),
  role: z.enum(roles_array).optional()
})

const post_id_filter = z.object({
  post_id: z.string().uuid()
})


export const create_post_schema = z.object({
  body: basic_post_request.strict()
});


export const get_post_by_id_schema = z.object({
  params: post_id_filter
});


export const update_post_changable_properties_schema = z.object({
  body: basic_post_request.omit({role: true}).partial().strict(),
  params: post_id_filter 
})


export const delete_post_by_id_schema = z.object({
  params: post_id_filter
});


export const change_post_role_schema = z.object({
  body: z.object({
    post_to_update: z.string().uuid(),
    role: z.enum(roles_array)
  }),
  params: z.object({
    authorized_moderator_id: z.string().uuid()
  }) 
})


