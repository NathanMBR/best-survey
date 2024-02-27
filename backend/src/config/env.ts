import { z as zod } from 'zod'

/* eslint-disable camelcase */
export const PORT = zod.coerce.number({
  required_error: 'PORT environment variable is required',
  invalid_type_error: 'PORT environment variable must be a number',
  description: 'PORT environment variable'
}).positive().parse(process.env.PORT)
/* eslint-enable camelcase */
