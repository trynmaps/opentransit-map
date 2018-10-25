## Getting Started

Check out our welcome doc: <http://bit.ly/opentransit-onboarding>.

### Tech stack

**Web app**

* Tryn-React (https://github.com/trynmaps/tryn-react): React, Relay, Flow

**Landing page**

* Tryn-Homepage (https://github.com/trynmaps/tryn-homepage): Bootstrap, HTML, CSS, JS 

**Middleware Services**

* Tryn-API (middleware + backend) (https://github.com/trynmaps/tryn-api): Node, GraphQL, Cassandra

**Backend Services**

* Orion (https://github.com/EddyIonescu/orion): Node, CQL (Cassandra Query Language - “like SQL except for when it’s not”), S3
* Orion-trip-generator: Node, Jest S3, SNS (https://github.com/trynmaps/orion-trip-generator)
* Orion-gtfs: Node or Python (https://github.com/trynmaps/orion-gtfs)
* Restbus (https://github.com/trynmaps/restbus): Node

**Database**

* Cassandra (Data Models in Orion)

**Infrastructure**

* Everything except the DB is dockerized and running on a Google Cloud Container
* Cassandra is in a 3-node cluster of N1s on Google Cloud
* Currently we only have Prod and Local environments

### Wiki

Also [read our wiki](http://GitHub.com/trynmaps/Orion/wiki) to learn about how we store data.

## Running the app

Prerequisites:

If running tryn-react with the backend running locally:
- Have tryn-api running and ensure that it's in the same parent directory as this repo.
- go to `envEndpoints.json` and set the `USE_PROD_ENDPOINT` flag to `false`.

If running tryn-react using the production API (recommended - do this unless you're working on the backend):
- Clone tryn-api to the same parent directory as this repo.
- Checkout the `prod` branch in `tryn-api`.

Once you're ready:

1. Ensure you have the `config.json` file in the src directory. You can get this from the shared files section of our Slack channel.
2. Run `yarn`.
3. **OPTIONAL**: Install Watchman via `brew install watchman`.
4. Run `yarn run relay` or (if you installed Watchman) `yarn run relay --watch`
5. Run `yarn start`.

## Deployment

TODO
