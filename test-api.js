const http = require('http');

const tests = [
  { path: '/api/2020-02-29', expectedUnix: 1582934400000 },
  { path: '/api/1451001600000', expectedUnix: 1451001600000 },
  { path: '/api/invalid-date', expectedError: 'Invalid Date' },
  { path: '/api/', expectCurrentTime: true }
];

function testApi(test) {
  return new Promise((resolve) => {
    http.get({ hostname: 'localhost', port: 3000, path: test.path, agent: false }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (test.expectedError) {
            if (json.error === test.expectedError) {
              console.log(`PASS: ${test.path} returned expected error`);
            } else {
              console.error(`FAIL: ${test.path} expected error "${test.expectedError}", got`, json);
            }
          } else if (test.expectCurrentTime) {
            if (json.unix && json.utc) {
              console.log(`PASS: ${test.path} returned current time`);
            } else {
              console.error(`FAIL: ${test.path} expected current time, got`, json);
            }
          } else if (json.unix === test.expectedUnix) {
            console.log(`PASS: ${test.path} returned expected unix timestamp`);
          } else {
            console.error(`FAIL: ${test.path} expected unix ${test.expectedUnix}, got`, json);
          }
        } catch (e) {
          console.error(`FAIL: ${test.path} response not valid JSON`, e);
        }
        resolve();
      });
    }).on('error', (e) => {
      console.error(`FAIL: ${test.path} request error`, e);
      resolve();
    });
  });
}

async function runTests() {
  for (const test of tests) {
    await testApi(test);
  }
  process.exit(0);
}

runTests();
