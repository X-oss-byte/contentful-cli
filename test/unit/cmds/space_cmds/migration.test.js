const { migration } = require('../../../../lib/cmds/space_cmds/migration.js')

const { version } = require('../../../../package.json')
const { getContext } = require('../../../../lib/context.js')
const { runMigration } = require('contentful-migration/built/bin/cli')

jest.mock('../../../../lib/context.js')
jest.mock('contentful-migration/built/bin/cli')

getContext.mockResolvedValue({ managementToken: 'managementToken' })

test('it should pass all args to the migration', async () => {
  const stubArgv = {
    context: {
      managementToken: 'managementToken',
      activeEnvironmentId: 'master',
      activeSpaceId: 'spaceId'
    },
    managementApplication: `contentful.cli/${version}`,
    managementFeature: 'space-migration'
  }
  await migration(stubArgv)
  const result = {
    ...stubArgv,
    spaceId: 'spaceId',
    environmentId: 'master',
    accessToken: 'managementToken',
    headers: {}
  }

  expect(runMigration.mock.calls[0][0]).toEqual(result)
  expect(runMigration).toHaveBeenCalledTimes(1)
})
