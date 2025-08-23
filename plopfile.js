module.exports = function (plop) {
  // Container generator
  plop.setGenerator('container', {
    description: 'Add a container component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'Form',
        validate: value => {
          if (/.+/.test(value)) {
            const fs = require('fs');
            const path = require('path');
            const pageComponents = fs.readdirSync(
              path.join(__dirname, 'src/containers'),
            );
            return pageComponents.indexOf(value) >= 0
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
      const actions = [
        {
          type: 'add',
          path: 'src/containers/{{properCase name}}/index.tsx',
          templateFile: 'internals/generators/container/index.tsx.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: 'src/containers/{{properCase name}}/{{properCase name}}.tsx',
          templateFile: 'internals/generators/container/component.tsx.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: 'src/containers/{{properCase name}}/constants.ts',
          templateFile: 'internals/generators/container/constants.ts.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: 'src/containers/{{properCase name}}/actions.ts',
          templateFile: 'internals/generators/container/actions.ts.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: 'src/containers/{{properCase name}}/reducer.ts',
          templateFile: 'internals/generators/container/reducer.ts.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: 'src/containers/{{properCase name}}/selectors.ts',
          templateFile: 'internals/generators/container/selectors.ts.hbs',
          abortOnFail: true,
        },
      ];

      if (data.wantSaga) {
        actions.push({
          type: 'add',
          path: 'src/containers/{{properCase name}}/saga.ts',
          templateFile: 'internals/generators/container/saga.ts.hbs',
          abortOnFail: true,
        });
      }

      if (data.wantLoadable) {
        actions.push({
          type: 'add',
          path: 'src/containers/{{properCase name}}/Loadable.ts',
          templateFile: 'internals/generators/container/loadable.ts.hbs',
          abortOnFail: true,
        });
      }

      return actions;
    },
  });
};
