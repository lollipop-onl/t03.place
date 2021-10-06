import { createClient } from 'microcms-js-sdk'

const {
  MICROCMS_SERVICE_DOMAIN = '',
  MICROCMS_API_KEY = '',
  MICROCMS_GLOBAL_DRAFT_KEY,
} = process.env;

console.log('📡 Received some environment variables:');
console.log(`MICROCMS_SERVICE_DOMAIN ... ${MICROCMS_SERVICE_DOMAIN || 'N/A'}`)
console.log(`MICROCMS_API_KEY ... ${MICROCMS_API_KEY || 'N/A'}`)
console.log(`MICROCMS_GLOBAL_DRAFT_KEY ... ${MICROCMS_GLOBAL_DRAFT_KEY || 'N/A'}`)

export const client = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
  globalDraftKey: MICROCMS_GLOBAL_DRAFT_KEY,
});
