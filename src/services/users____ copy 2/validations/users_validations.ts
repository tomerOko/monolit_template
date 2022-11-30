import { z } from "zod";
import { country_codes_array, roles_array } from "./community_objects_as_arrays";





const basic_community_request = z.object({
  country:z.enum(country_codes_array),
  email: z.string().optional(),
  image: z.string().url().optional(),
  name: z.string(),
  role: z.enum(roles_array).optional()
})

const community_id_filter = z.object({
  community_id: z.string().uuid()
})


export const create_community_schema = z.object({
  body: basic_community_request.strict()
});


export const get_community_by_id_schema = z.object({
  params: community_id_filter
});


export const update_community_changable_properties_schema = z.object({
  body: basic_community_request.omit({role: true}).partial().strict(),
  params: community_id_filter 
})


export const delete_community_by_id_schema = z.object({
  params: community_id_filter
});


export const change_community_role_schema = z.object({
  body: z.object({
    community_to_update: z.string().uuid(),
    role: z.enum(roles_array)
  }),
  params: z.object({
    authorized_moderator_id: z.string().uuid()
  }) 
})


