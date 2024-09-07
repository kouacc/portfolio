import * as Sentry from '@sentry/node'
const { nodeProfilingIntegration } = require('@sentry/profiling-node')

Sentry.init({
  dsn: "https://411fef8dc4185deb1a03ac1557fd3c83@o4507525533532160.ingest.de.sentry.io/4507912491171920",
  integrations: [
    nodeProfilingIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});