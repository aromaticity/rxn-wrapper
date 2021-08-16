import RXNWrapper from '../lib/main';

const wrapper = new RXNWrapper({
    apiKey: process.env.APIKEY,
    projectId: process.env.PROJECTID
});

wrapper.getPredictReactionResults(process.env.PREDICTIONID).then(res => {
    console.log(res);
});