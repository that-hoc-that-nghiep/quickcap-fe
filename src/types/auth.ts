import { Org } from './org'
import { User } from './user'

export type VerifyUser = User & {
    organizations: (Org & { is_owner: boolean; is_permission: string })[]
}
