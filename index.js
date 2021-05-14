const fs = require('fs');
const d3 = require('d3');
const jsdom = require('jsdom');
const nodeHtmlToImage = require('node-html-to-image')
const { JSDOM } = jsdom;
var Jimp = require('jimp');

const fakeDom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

const outputLocation = './output.svg';

let body = d3.select(fakeDom.window.document).select('body');

// Make an SVG Container
let svgContainer = body.append('div').attr('class', 'container')
  .append("svg")
    .attr("width", 1280)
    .attr("height", 1024);

// Draw a line
let line = svgContainer.append("line")
  .attr("x1", 5)
  .attr("y1", 5)
  .attr("x2", 500)
  .attr("y2", 500)
  .attr("stroke-width", 2)
  .attr("stroke", "black");


let circle = svgContainer.append("circle")
    .attr('cx', 300)
    .attr('cy', 150)
    .attr('r', 30)
    .attr('fill', '#26963c')

// Output the result to console
console.log(body.select('.container').html());

// Output the result to file
fs.writeFileSync(outputLocation, body.select('.container').html());


// SALVA EM HTML
// fs.writeFile('index.html', body.select('.container').html(), function(err) {
// 	if(err) {
// 		console.log('error saving document', err)
// 	} else {
// 		console.log('The file was saved, open index.html to see the result')
// 	}
// })


//salva em imagem
nodeHtmlToImage({
  output: './teste.jpg',
  html: body.select('.container').html()
})
  .then(() => {
    Jimp.read('teste.jpg', (err, lenna) => {
      if (err) throw err;
      lenna
        .resize(300, 300) // resize
        .quality(100) // set JPEG quality
        // .greyscale() // set greyscale
        .write('lena-small-bw.bmp'); // save
    });

    console.log('The image was created successfully!')
  } )



