
module.exports = (html) => {
  // Add ⚡ to html tag
  html = html.replace(/<html/gi, '<html ⚡')
  // Add amp-custom tag to added CSS
  html = html.replace(/<style data-vue-ssr/g, '<style amp-custom data-vue-ssr')
  // Remove every script tag from generated HTML
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  // Add AMP script before </head>
  const ampScript = '<script async src="https://cdn.ampproject.org/v0.js"></script>'
  html = html.replace('</head>', ampScript + '</head>')
  return html
}
