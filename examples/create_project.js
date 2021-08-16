import RXNWrapper from '../lib/main';

const wrapper = new RXNWrapper({
    apiKey: process.env.APIKEY
});

wrapper.createProject({
    name: 'sample_projects',
    select: True
});