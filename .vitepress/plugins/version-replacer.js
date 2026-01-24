/**
* Markdown-it plugin for replacing version placeholders
*
* Replaces |phpversion| and |minphpversion| with static PHP version requirements.
*/

/**
* Create a version replacer plugin
* @param {Object} md - markdown-it instance
* @param {Object} options - plugin options
* @param {string} options.phpversion - Current PHP version (default: '8.4')
* @param {string} options.minphpversion - Minimum PHP version (default: '8.1')
* @returns {void}
*/
export function versionReplacer(md, options = {}) {
  // Use provided versions or fall back to defaults
  const phpversion = options.phpversion || '8.4'
  const minphpversion = options.minphpversion || '8.1'

  // Store original render method
  const originalRender = md.render.bind(md)

  md.render = function(src, env = {}) {
    src = src
      .replace(/\|phpversion\|/g, `**${phpversion}**`)
      .replace(/\|minphpversion\|/g, `*${minphpversion}*`)

    return originalRender(src, env)
  }
}

export default versionReplacer
