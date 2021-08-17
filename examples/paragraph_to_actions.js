import RXNWrapper from '../';

const wrapper = new RXNWrapper({
    apiKey: process.env.APIKEY
});

wrapper.paragraphToActions([
    'To a stirred solution of',
    '7-(difluoromethylsulfonyl)-4-fluoro-indan-1-one (110 mg,',
    '0.42 mmol) in methanol (4 mL) was added sodium borohydride',
    '(24 mg, 0.62 mmol). The reaction mixture was stirred at',
    'ambient temperature for 1 hour.'
]).then(res => {
    console.log(res);
});