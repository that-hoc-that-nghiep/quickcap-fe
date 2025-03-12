import { Grid } from '@mantine/core'
import OrgCommonSettings from './_components/org-common-settings'
import OrgMemberSettings from './_components/org-memeber-settings'

export const SettingsPage = () => {
    return (
        <Grid gutter='xl'>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <OrgCommonSettings />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
                <OrgMemberSettings />
            </Grid.Col>
        </Grid>
    )
}
