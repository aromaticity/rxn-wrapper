import RXNWrapper from '../index';

const wrapper = new RXNWrapper({
    apiKey: process.env.APIKEY,
    projectId: process.env.PROJECTID
});

async function predict() {
    const predictionId = await wrapper.predictRetrosynthesis({
        product: 'Brc1c2ccccc2c(Br)c2ccccc12'
    });

    setTimeout(
        () => {
            wrapper.getPredictRetrosynthesisResults(predictionId).then(res => {
                console.log(res);
            });
        }, 5000
    );
}

predict();