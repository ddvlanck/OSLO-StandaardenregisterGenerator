const program = require('commander');
const fs = require('fs');
const nunjucks = require('nunjucks');



program
    .version('0.8.0')
    .usage('node html-generator.js creates html pages for json file of OSLOthema repositories')
    .option('-f, --file <target>', 'Location of configuration file of the repository for which template must be built')
    .option('-o, --output <target>', 'Location where the HTML page should be saved');

program.on('--help', function(){
    console.log('')
});

program.parse(process.argv);

let output = program.output || '.';
if(output.charAt(output.length-1) === '/'){
    output = output.substring(0, output.length - 1);
}

const content = fs.readFileSync(program.file);
const configuration = JSON.parse(content.toString());

nunjucks.configure('./templates', {
    autoescape: true
});

const html = nunjucks.render('body.j2', configuration);
const data = new Uint8Array(Buffer.from(html));

fs.writeFile(output, data, (err) => {
    if (err) {
        // Set the exit code if there's a problem so bash sees it
        process.exitCode = 1
        throw err;
    }
    console.log('The file has been saved to standaarden_pagina.html');
});
