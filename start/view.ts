import env from '#start/env'
import edge from 'edge.js'

edge.global('appName', env.get('PUBLIC_APP_NAME', 'Chargement...'))
