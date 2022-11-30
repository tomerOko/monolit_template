import { CountryCode, country_codes } from "../../../types/coutries";
import { roles, Role } from "../types/posts_types";

export const country_codes_array : [CountryCode, ... CountryCode[]] = [
    Object.keys(country_codes)[0] as CountryCode,
    ...Object.keys(country_codes).slice(1) as CountryCode[]
]

export const roles_array : [Role, ... Role[]] = [
    Object.keys(roles)[0] as Role,
    ...Object.keys(roles).slice(1) as Role[]
]

