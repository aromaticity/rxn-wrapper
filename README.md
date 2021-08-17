# rxn-wrapper

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

You can select a project by initializing the wrapper with the `projectId` property or by setting it programatically. Another way is setting `select` to `True` in the creation process.

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

### Retrosynthesis prediction

```javascript
import RXNWrapper from 'rxn-wrapper';

const wrapper = new RXNWrapper({
    apiKey: 'your_apikey',
    projectId: 'project_id'
});

const delay = ms => new Promise(res => setTimeout(res, ms));

async function getStatus(predictionId) {
    await delay(5000);

    const res = await wrapper.getPredictRetrosynthesisResults(predictionId).then(res => {
        if (res.status === 'SUCCESS') return false;
        return true;
    });

    return res;
}

async function predict() {
    const predictionId = await wrapper.predictRetrosynthesis({
        product: 'Brc1c2ccccc2c(Br)c2ccccc12'
    });

    await delay(2000);

    while (await getStatus(predictionId)) {
        console.log('Waiting for results...');
    }

    await delay(2000);

    wrapper.getPredictRetrosynthesisResults(predictionId).then(res => {
        console.log(res);
    });
}

predict();
```

### Extracting actions from a paragraph describing a recipe 

```javascript
import RXNWrapper from 'rxn-wrapper';

const wrapper = new RXNWrapper({
    apiKey: 'your_apikey',
});

wrapper.paragraphToActions([
    'To a stirred solution of',
    '7-(difluoromethylsulfonyl)-4-fluoro-indan-1-one (110 mg,',
    '0.42 mmol) in methanol (4 mL) was added sodium borohydride',
    '(24 mg, 0.62 mmol). The reaction mixture was stirred at',
    'ambient temperature for 1 hour.'
]).then(res => {
    console.log(res);
    /*
        [
            'MAKESOLUTION with 7-(difluoromethylsulfonyl)-4-fluoro-indan-1-one (110 mg, 0.42 mmol) and methanol (4 mL)',
            'ADD SLN',
            'ADD sodium borohydride (24 mg, 0.62 mmol)',
            'STIR for 1 hour at ambient temperature'
        ]
    */
});
```

### Forward prediction in batch

It is possible to run a batch of forward reaction predictions without linking them to a project:

```javascript
import RXNWrapper from 'rxn-wrapper';

const wrapper = new RXNWrapper({
    apiKey: 'your_apikey',
});

async function predict() {
    const { taskId, taskStatus } = await wrapper.predictReactionBatch({
        reactants: ['BrBr.c1ccc2cc3ccccc3cc2c1', 'Cl.c1ccc2cc3ccccc3cc2c1']
    });

    setTimeout(
        () => {
            wrapper.getPredictReactionBatchResults(taskId).then(({ result, task, taskStatus }) => {
                console.log(result);
                /*
                    {
                        aiModel: '2020-08-10',
                        predictions: [
                            {
                                attention_weights: null,
                                confidence: 0.9797951373863595,
                                message: 'ok',
                                predict_time: 0.405620813369751,
                                reaction_image: null,
                                smiles: 'BrBr.c1ccc2cc3ccccc3cc2c1>>Brc1c2ccccc2cc2ccccc12',
                                total_time: 0.41137075424194336
                            },
                            {
                                attention_weights: null,
                                confidence: 0.5872236848398613,
                                message: 'ok',
                                predict_time: 0.405620813369751,
                                reaction_image: null,
                                smiles: 'Cl.c1ccc2cc3ccccc3cc2c1>>ClC1c2ccccc2Cc2ccccc21',
                                total_time: 0.41137075424194336
                            }
                        ]
                    }
                */
                console.log(task);
                // { status: 'DONE', task_id: 'task_id' }
            });
        }, 2000
    );
}

predict();
```

**NOTE**: the results for batch prediction are not stored permanently in the RXN databases, so it is strongly recommend to save them since they will expire.