import { defineConfig } from '@adonisjs/static'

/**
 * Configuration options to tweak the static files middleware.
 * The complete set of options are documented on the
 * official documentation website.
 *
 * https://docs.adonisjs.com/guides/basics/static-file-server
 */
const staticServerConfig = defineConfig({
  /**
   * Enable or disable static file serving middleware.
   */
  enabled: true,

  /**
   * Generate ETag headers for client/proxy caching.
   */
  etag: true,

  /**
   * Include Last-Modified headers for conditional requests.
   */
  lastModified: true,

  /**
   * Policy for files starting with a dot.
   */
  dotFiles: 'ignore',

  /**
   * Enable caching for assets
   */
  headers: (path) => {
    if (path.startsWith('assets/')) {
      return {
        'Cache-Control': 'public, max-age=31536000, immutable',
      }
    }

    return {
      'Cache-Control': 'public, max-age=3600',
    }
  },
})

export default staticServerConfig
