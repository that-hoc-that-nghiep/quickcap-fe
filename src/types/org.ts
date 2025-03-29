import { User } from './user'

export type Org = {
    id: string
    name: string
    image: string
    type: 'Personal' | 'Organization'
    isDeleted: boolean
}

export type OrgInfo = {
    organization: Org
    users: (User & { is_owner: boolean; is_permission: string })[]
}

export const PermissionTypeUI: Record<string, string> = {
    READ: 'View Only',
    UPLOAD: 'Can Edit'
}

export const PermissionData: Record<string, string> = {
    'View Only': 'READ',
    'Can Edit': 'UPLOAD'
}
