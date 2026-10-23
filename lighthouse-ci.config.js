/** Mobile lab regression gate. This does not establish field INP, LCP or conversion. */
module.exports = {
  ci: {
    collect: {
      url: [
        'http://127.0.0.1:3000/',
        'http://127.0.0.1:3000/diagnostico',
        'http://127.0.0.1:3000/planos',
      ],
      startServerCommand: 'pnpm start --hostname 127.0.0.1 --port 3000',
      startServerReadyPattern: 'Ready',
      startServerReadyTimeout: 60000,
      numberOfRuns: 3,
      settings: {
        preset: 'perf',
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 1,
          disabled: false,
        },
      },
    },
    assert: {
      assertions: {
        'categories:performance': [
          'error',
          { minScore: 0.9, aggregationMethod: 'median-run' },
        ],
        'largest-contentful-paint': [
          'error',
          { maxNumericValue: 2000, aggregationMethod: 'median-run' },
        ],
        'cumulative-layout-shift': [
          'error',
          { maxNumericValue: 0.1, aggregationMethod: 'median-run' },
        ],
        'total-byte-weight': ['warn', { maxNumericValue: 1600000 }],
        'server-response-time': ['warn', { maxNumericValue: 800 }],
      },
    },
    upload: { target: 'filesystem', outputDir: './reports/lighthouse' },
  },
};
