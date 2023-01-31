const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT'),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
      ssl: env.bool('DATABASE_SSL', false)
    },
    pool: {
      min: 0,
      max: 10,
      /**
       * Acquire promises are rejected after milliseconds if a resource cannot be acquired.
       */
      acquireTimeoutMillis: 30000,
      /**
       * Create operations are cancelled after milliseconds if a resource cannot be acquired.
       */
      createTimeoutMillis: 30000,
      /**
       * Destroy operations are awaited for at most milliseconds,
       * new resources will be created after this timeout.
       */
      destroyTimeoutMillis: 5000,
      /**
       * Free resources are destroyed after this many milliseconds.
       * If min > 0, some resources may be kept alive for longer.
       * To reliably destroy all idle resources, set min to 0.
       */
      idleTimeoutMillis: 30000,
      /**
       * How often to check for idle resources to destroy.
       */
      reapIntervalMillis: 1000,
      /**
       * How long to idle after failed create before trying again.
       */
      createRetryIntervalMillis: 200
    },
    /**
     * How long to wait before throwing a timeout error when acquiring a connection is not possible.
     */
    acquireConnectionTimeout: 10000,
  },
});
