let host
switch (process.env.REACT_APP_ENV) {
  case 'lcl':
    host = 'http://localhost:3000'
    break
  case 'dev':
    host = 'https://682d0bdc-1f98-4c73-9b5a-d9cb31eea81b.mock.pstmn.io'
    break
  case 'stg':
    host = 'https://staging.example.com'
    break
  case 'prd':
    host = 'https://example.com'
    break
  default:
    host = 'https://682d0bdc-1f98-4c73-9b5a-d9cb31eea81b.mock.pstmn.io'
    break
}

export const SERVER_HOST = host
export const AUTH_API_ROOT = SERVER_HOST + '/auth/v1'
export const API_ROOT = SERVER_HOST + '/api/v1'
