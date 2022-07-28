const {
  environmentDelete
} = require('../../../../../lib/cmds/space_cmds/environment_cmds/delete.js')
const { getContext } = require('../../../../../lib/context.js')
const {
  createManagementClient
} = require('../../../../../lib/utils/contentful-clients.js')

jest.mock('../../../../../lib/context.js')
jest.mock('../../../../../lib/utils/contentful-clients.js')

const deleteEnvironmentStub = jest.fn()
const environmentData = {
  name: 'environment name',
  sys: {
    id: 'environmentId'
  },
  delete: deleteEnvironmentStub
}
const getEnvironmentStub = jest.fn().mockResolvedValue(environmentData)

const fakeClient = {
  getSpace: async () => ({
    getEnvironment: getEnvironmentStub
  })
}
createManagementClient.mockResolvedValue(fakeClient)

getContext.mockResolvedValue({
  managementToken: 'mockedToken'
})

afterEach(() => {
  createManagementClient.mockClear()
  createManagementClient.mockClear()
  getEnvironmentStub.mockClear()
  deleteEnvironmentStub.mockClear()
})

test('delete environment', async () => {
  const result = await environmentDelete({
    context: {
      activeSpaceId: 'someSpaceID'
    },
    environmentId: 'someEnvironmentID'
  })
  expect(result).toBeTruthy()
  expect(createManagementClient).toHaveBeenCalledTimes(1)
  expect(getEnvironmentStub).toHaveBeenCalledTimes(1)
  expect(getEnvironmentStub.mock.calls[0][0]).toBe('someEnvironmentID')
  expect(deleteEnvironmentStub).toHaveBeenCalledTimes(1)
})
