import { z } from "zod";
import { roles , Role } from "../types/users_types";

const user_request_object = z.object({
  country:z.string(),
  email: z.string().optional(),
  image: z.string().url().optional(),
  name: z.string(),
  role: z.enum().optional()
})


role?: Role,
email?: string, // most moderators + super moderators have it but not all of them.
image?: URL, 
country: CountryCode// assume this is always defined.
communities: Community["token"][]


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

