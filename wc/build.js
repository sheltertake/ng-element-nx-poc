const concat = require('concat');

const build = async () =>{
    const files = [
        '../output/wc/runtime.js',
        '../output/wc/polyfills.js',
        '../output/wc/main.js'
      ];
    
      await concat(files, '../output/wc.min.js');
}
build();