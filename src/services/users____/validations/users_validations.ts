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
export type CreateUserRequest = z.infer<typeof create_user_schema>;


export const update_user_schema = z.object({
  body: user_request_object.partial(),
  params: z.object({
    token: z.string().uuid()
  })
})
export type UpdateUserRequest = z.infer<typeof update_user_schema>;

