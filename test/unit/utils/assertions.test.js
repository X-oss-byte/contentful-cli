const {
  assertLoggedIn,
  assertSpaceIdProvided
} = require('../../../lib/utils/assertions.mjs')

const { getContext } = require('../../../lib/context.mjs')
const { highlightStyle } = require('../../../lib/utils/styles.mjs')

jest.mock('../../../lib/context.mjs')
jest.mock('../../../lib/utils/styles.mjs')

getContext.mockResolvedValue({
  managementToken: 'mockedToken'
})

afterEach(() => {
  highlightStyle.mockClear()
  getContext.mockClear()
})

test('assertLoggedIn when not logged in', async () => {
  getContext.mockResolvedValueOnce({})
  await expect(assertLoggedIn()).rejects.toThrowErrorMatchingSnapshot()
})

test('assertLoggedIn when logged in', async () => {
  await expect(assertLoggedIn)
})

test('assertSpaceIdProvided when provided via args', async () => {
  await assertSpaceIdProvided({
    spaceId: 'mocked spaceId'
  })
})

test('assertSpaceIdProvided when provided via context', async () => {
  getContext.mockResolvedValueOnce({
    activeSpaceId: 'space id',
    managementToken: 'mockedToken'
  })
  await assertSpaceIdProvided()
})

test('assertSpaceIdProvided when not provided at all', async () => {
  await expect(assertSpaceIdProvided({})).rejects.toThrowErrorMatchingSnapshot()
})
