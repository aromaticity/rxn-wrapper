import RXNWrapper from '../';

const wrapper = new RXNWrapper({
    apiKey: process.env.APIKEY
});

wrapper.listAllProjects().then(projects => {
    console.log(projects);
})