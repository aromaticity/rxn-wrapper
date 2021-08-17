import RXNWrapper from '../';

const wrapper = new RXNWrapper({
    apiKey: process.env.APIKEY
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