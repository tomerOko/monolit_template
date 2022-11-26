import { z } from "zod";
import { roles_array } from "../types/users_types";

const user_request_object = z.object({
  country:z.string(),
  email: z.string().optional(),
  image: z.string().url().optional(),
  name: z.string(),
  role: z.enum(roles_array).optional()
})

const user_id_filter = z.object({
  user_id: z.string().uuid()
})


export const create_user_schema = z.object({
  body: user_request_object
});


export const get_user_by_id_schema = z.object({
  params: user_id_filter
});


export const update_user_changable_properties_schema = z.object({
  body: user_request_object.omit({role: true}),
})


export const delete_user_by_id_schema = z.object({
  params: user_id_filter
});

