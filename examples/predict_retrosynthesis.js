import RXNWrapper from '../';

const wrapper = new RXNWrapper({
    apiKey: process.env.APIKEY,
    projectId: process.env.PROJECTID
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