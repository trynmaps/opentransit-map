const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime');

const network = Network.create(
  (operation, variables) => {
    return fetch('http://localhost:4000/graphql', {
      method: 'POST',

      headers: {
        // Add authentication and other headers here
        'content-type': 'application/json',
        'accept': 'application/json'

      },

      body: JSON.stringify({
        query: operation.text,   // GraphQL text from input
        variables,
      }),

    }).then(response => {
      return response.json();
    });
  }
);

const store = new Store(new RecordSource());

export default new Environment({
  network,
  store,
});