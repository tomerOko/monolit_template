import { z } from "zod";
import { roles , Role, roles_array } from "../types/users_types";

const user_request_object = z.object({
  country:z.string(),
  email: z.string().optional(),
  image: z.string().url().optional(),
  name: z.string(),
  role: z.enum(roles_array).optional()
})


export const create_user_schema = z.object({
  body: user_request_object
});
export type CreateUserRequestValidated = z.infer<typeof create_user_schema>;


export const get_user_by_id_schema = z.object({
  body: z.object({
    user_id: z.string().uuid()
  })
});
export type getUserByIdValidated = z.infer<typeof get_user_by_id_schema>;


export const update_user_changable_properties_schema = z.object({
  body: user_request_object.omit({role: true}),
})
export type UpdateUserChangablePropertiesRequest = z.infer<typeof update_user_changable_properties_schema>;

