const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime');
const { LOCAL_API_URL, PROD_API_URL, USE_PROD_ENDPOINT } = require('./envEndpoints.json');

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(
  operation,
  variables,
  // cacheConfig,
  // uploadables,
) {
  return fetch(USE_PROD_ENDPOINT ? PROD_API_URL : LOCAL_API_URL, {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => response.json());
}

const source = new RecordSource();
const store = new Store(source);
const network = Network.create(fetchQuery);

export default new Environment({
  network,
  store,
});
