import RXNWrapper from '../';

const wrapper = new RXNWrapper({
    apiKey: process.env.APIKEY,
    projectId: process.env.PROJECTID
});

async function predict() {
    const predictionId = await wrapper.predictReaction({
        reactants: 'BrBr.c1ccc2cc3ccccc3cc2c1'
    });

    setTimeout(
        () => {
            wrapper.getPredictReactionResults(predictionId).then(res => {
                console.log(res);
            });
        }, 1000
    );
}

predict();