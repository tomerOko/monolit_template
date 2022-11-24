import { z } from "zod";

export const create_post_schema = z.object({
    // body: z.object({
    //   fullName: z.string({
    //     required_error: "Full name is required",
    //   }),
    //   email: z
    //     .string({
    //       required_error: "Email is required",
    //     })
    //     .email("Not a valid email"),
    // }),
  });

