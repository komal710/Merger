// // const PDFMerger = require('pdf-merger-js');
// // var merge = new PDFMerger();

// //     const mergerPdfs=async (p1,p2) => {
// //         await merger.add(p1);//whole file
// //         //await merger.add('2.pdf.pdf', 2);// for specific page
// //         await merger.add(p2);
// //         await merger.save('public/merged.pdf');
// //     }
// //     module.exports = {mergerPdfs};

// import('pdf-merger-js').then(pdfMergerModule )
// const PDFMerger = pdfMergerModule.default || pdfMergerModule;
//     const merger = new PDFMerger();
    
//     const mergerPdfs=async (p1,p2) => {
//         await merger.add(p1);//whole file
//         //await merger.add('2.pdf.pdf', 2);// for specific page
//         await merger.add(p2);
//         await merger.save('public/merged.pdf');
//     }
//     module.exports = {mergerPdfs};
// // }
// // ).catch(error => {
// //     console.error('Error loading pdf-merger-js module:', error);
// // });

// Importing and setting up the PDFMerger module
let PDFMerger;
let merger;
let mergerPdfs;

(async () => {
  const pdfMergerModule = await import('pdf-merger-js');
  PDFMerger = pdfMergerModule.default || pdfMergerModule;
  merger = new PDFMerger();

  mergerPdfs = async (p1, p2) => {
    await merger.add(p1); //whole file
    await merger.add(p2);
    let d = new Date().getTime()
    await merger.save('public/${d}.pdf');
    return d
  }
  module.exports = {mergerPdfs};
})();
