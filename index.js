#!/usr/bin/env node

const puppeteer = require('puppeteer');

const argv = require('yargs')(process.argv.slice(2))
    .option('url', {
        alias: 'u',
        type: 'string',
        description: 'URL to html file'
    })
    .option('pdf', {
        alias: 'p',
        type: 'string',
        description: 'path to output pdf'
    })
    .option('format', {
        alias: 'f',
        type: 'string',
        default: 'a4',
        description: 'All the valid paper format types when printing a PDF, a full list of them at https://pptr.dev/api/puppeteer.lowercasepaperformat/'
    })
    .boolean('display-header-footer')
    .describe('display-header-footer', 'Whether to show the header and footer')
    .default('display-header-footer', false)

    .boolean('omit-background')
    .describe('omit-background', 'Hides default white background and allows generating pdfs with transparency')
    .default('omit-background', false)
    
    .boolean('landscape')
    .describe('landscape', 'Whether to print in landscape orientation')
    .default('landscape', false)
    
    .boolean('prefer-css-page-size')
    .describe('prefer-css-page-size', 'Give any CSS @page size declared in the page priority over what is declared in the width or height or format option')
    .default('prefer-css-page-size', false)
    
    .boolean('print-background')
    .describe('print-background', 'Set to true to print background graphics')
    .default('print-background', false)
    
    .demandOption(['url', 'pdf'], 'Please enter input url and outpput pdf path')
    .help().argv;


console.log('URL: ' + argv.url);
console.log('PDF path:' + argv.pdf);

class RenderPDF {

    static async renderPDF(url = 'http://127.0.0.1:8080/nutanix/systems-security-module-3/day9/test.html', pdf='test.pdf') {
        const launchParams = {
            headless: true,
            slowMo: 0 // TODO remove debug stuff
        };

        const browser = await puppeteer.launch(launchParams);
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36");
        await page.goto(url, {
        waitUntil: 'networkidle2',
        });
        
        await page.emulateMediaType("print");

        //await page.waitForTimeout(500); // wait for all fonts to load
        await page.evaluateHandle('document.fonts.ready'); // wait for all fonts to load

        await page.pdf({path: pdf, format: 'a4', displayHeaderFooter: false, landscape: true, preferCSSPageSize: true, printBackground: true, omitBackground: true});

        await browser.close();
    }
}

(async () => {
    await RenderPDF.renderPDF(argv.url, argv.pdf);
})();