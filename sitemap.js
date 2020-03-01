const sitemap = require('nextjs-sitemap-generator');  

sitemap({
  baseUrl: 'https://shokz.grief.dev',
  pagesDirectory: __dirname + "/src/pages",  
  targetDirectory : 'public/',
  nextConfigPath: __dirname + "/next.config.js",
  ignoredExtensions: [
        'png',
        'jpg'
  ],
  pagesConfig: {
    '/': {
      priority: '0.5',
      changefreq: 'daily'
    }
  }
});