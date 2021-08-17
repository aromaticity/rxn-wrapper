import cheerio from 'cheerio';

export function parseActions(html: string) {
    const $ = cheerio.load(html);
    let actions: string[] = [];

    $('li').each((i, el) => {
        actions.push($(el).contents().text());
    });

    return actions;
}