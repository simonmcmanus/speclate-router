module.exports = {
  '/index.html': {
    page: 'home'
  },
  '/contact.html': {
    page: 'contact'
  },
  options: {
    outputDir: 'docs',
    files: ['./client/router-compiled.js']
  }
}
