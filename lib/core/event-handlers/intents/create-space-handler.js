import { CREATE_SPACE_HANDLER } from '../../events/scopes.js'
import inquirer from 'inquirer'

export default () => {
  const createSpaceHandlerIntents = {
    scopes: [CREATE_SPACE_HANDLER],
    intents: {
      SELECT_ORG: async ({ organizations }) => {
        const answersOrganizationSelection = await inquirer.prompt([
          {
            type: 'list',
            name: 'organizationId',
            message: 'Please select an organization:',
            choices: organizations
          }
        ])

        return answersOrganizationSelection.organizationId
      }
    }
  }

  return createSpaceHandlerIntents
}
