## Prerequisites

If running tryn-react with the backend running locally:
- Have tryn-api running and ensure that it's in the same parent directory as this repo.
- go to `envEndpoints.json` and set the `USE_PROD_ENDPOINT` flag to `false`.

If running tryn-react using the production API (recommended - do this unless you're working on the backend):
- Clone tryn-api to the same parent directory as this repo.
- Checkout the `prod` branch in `tryn-api`.

## Getting Started

See our welcome doc for contribution and deployment guidelines.
https://docs.google.com/document/d/1KTWRc4EO63_lDxjcp0mmprgrFPfFazWJEy2MwxBuw4E/edit?usp=sharing

1. Ensure you have the `config.json` file in the source directory. You can get this from the shared files section of our Slack channel.
2. Run `yarn`.
3. Install Watchman via `brew install watchman`.
4. Run `yarn run relay --watch`
5. Run `yarn start`.

## Deployment

TODO
