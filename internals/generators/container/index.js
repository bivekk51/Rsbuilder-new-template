/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: 'Do you want to load the container asynchronously?',
    },
  ],
  actions: data => {
    // Generate index.tsx
    const actions = [
      {
        type: 'add',
        path: '../../src/containers/{{properCase name}}/index.tsx',
        templateFile: './container/index.tsx.hbs',
        abortOnFail: true,
      },
    ];

    // Generate component
    actions.push({
      type: 'add',
      path: '../../src/containers/{{properCase name}}/{{properCase name}}.tsx',
      templateFile: './container/component.tsx.hbs',
      abortOnFail: true,
    });

    // Generate constants
    actions.push({
      type: 'add',
      path: '../../src/containers/{{properCase name}}/constants.ts',
      templateFile: './container/constants.ts.hbs',
      abortOnFail: true,
    });

    // Generate actions
    actions.push({
      type: 'add',
      path: '../../src/containers/{{properCase name}}/actions.ts',
      templateFile: './container/actions.ts.hbs',
      abortOnFail: true,
    });

    // Generate reducer
    actions.push({
      type: 'add',
      path: '../../src/containers/{{properCase name}}/reducer.ts',
      templateFile: './container/reducer.ts.hbs',
      abortOnFail: true,
    });

    // Generate selectors
    actions.push({
      type: 'add',
      path: '../../src/containers/{{properCase name}}/selectors.ts',
      templateFile: './container/selectors.ts.hbs',
      abortOnFail: true,
    });

    // Generate saga
    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/saga.ts',
        templateFile: './container/saga.ts.hbs',
        abortOnFail: true,
      });
    }

    // Generate Loadable
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/Loadable.ts',
        templateFile: './container/loadable.ts.hbs',
        abortOnFail: true,
      });
    }

    // Add prettify action for TypeScript files
    actions.push({
      type: 'prettify',
      path: 'containers/',
    });

    return actions;
  },
};
