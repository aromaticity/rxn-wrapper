import RXNWrapper from '../lib/main';

const wrapper = new RXNWrapper({
    apiKey: process.env.APIKEY,
    projectId: process.env.PROJECTID
});

wrapper.predictReaction({
        reactants: 'BrBr.c1ccc2cc3ccccc3cc2c1'
}).then(predictionId => {
    console.log(predictionId);
});