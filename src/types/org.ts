import { User } from './user'

export type Org = {
    id: string
    name: string
    image: string
    type: 'Personal' | 'Organization'
}

export type OrgInfo = {
    organization: Org
    users: (User & { is_owner: boolean; is_permission: string })[]
}
