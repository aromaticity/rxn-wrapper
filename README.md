# rxn-wrapper

A JavaScript wrapper to access the API of the IBM RXN for Chemistry [website](https://rxn.res.ibm.com/rxn/).

This project it is inspired by [rxn4chemistry](https://github.com/rxn4chemistry/rxn4chemistry).

## Install
Using npm:

```
$ npm install rxn-wrapper
```

Using yarn:

```
$ yarn add rxn-wrapper
```

## Usage

### Initialize the wrapper

The `baseUrl` is set by default to 'https://rxn.res.ibm.com/rxn/'.

```javascript
import RXNWrapper from 'rxn-wrapper';

const wrapper = new RXNWrapper({
    apiKey: 'your_apikey',
    // These fields are not required to initialize the wrapper
    // baseUrl: '',
    // projectId: ''
});
```

### Create a project

```javascript
import RXNWrapper from 'rxn-wrapper';

const wrapper = new RXNWrapper({
    apiKey: 'your_apikey',
});

wrapper.createProject({
    name: 'project_name',
    // These fields are not required
    // invitations: [],
    // select: True
});
```

### Select a project

You can select a project by initializing the wrapper with the `projectId` property or by setting it programatically. Another way is setting `select` to `True` in the creationg process.

```javascript
import RXNWrapper from 'rxn-wrapper';

const wrapper = new RXNWrapper({
    apiKey: 'your_apikey',
});

wrapper.setProjectId('project_id');
```

### Reaction prediction

```javascript
import RXNWrapper from 'rxn-wrapper';

const wrapper = new RXNWrapper({
    apiKey: 'your_apikey',
    projectId: 'project_id'
});

async function predict() {
    const predictionId = await wrapper.predictReaction({
        reactants: 'BrBr.c1ccc2cc3ccccc3cc2c1'
    });

    setTimeout(
        () => {
            wrapper.getPredictReactionResults(predictionId).then(smiles => {
                console.log(smiles); // BrBr.c1ccc2cc3ccccc3cc2c1>>Brc1c2ccccc2cc2ccccc12
            });
        }, 500
    );
}

predict();

```