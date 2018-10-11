## Prerequisites

If running tryn-react with the backend running locally:
- Have tryn-api running and ensure that it's in the same parent directory as this repo.
- go to `envEndpoints.json` and set the `USE_PROD_ENDPOINT` flag to `false`.

If running tryn-react using the production API (recommended - do this unless you're working on the backend):
- Clone tryn-api to the same parent directory as this repo.
- Checkout the `prod` branch in `tryn-api`.

## Getting Started

Check out our welcome doc: <http://bit.ly/opentransit-onboarding>.

1. Ensure you have the `config.json` file in the src directory. You can get this from the shared files section of our Slack channel.
2. Run `yarn`.
3. **OPTIONAL**: Install Watchman via `brew install watchman`.
4. Run `yarn run relay` or (if you installed Watchman) `yarn run relay --watch`
5. Run `yarn start`.

## Contributing 

1. Look at the issues sections for the repos you’re looking to work on.
1. Pick an issue you’d like to work on. If you want to take on an existing issue in a repo, just assign it to yourself.
3. Clone the repo (since you’ll have push access, clone the repo directly).
4. Ensure your branch name contains the issue number.
5. Make a PR with your issue linked to it.
6. Once approved, merge your changes (please squash and merge if the commit messages aren’t descriptive), delete your branch, and close the issue.

We also do code-reviews as to ensure that everything’s done correctly. They’re also a great learning opportunity If you’re new to some of our stack. See [this guide](https://engineeringblog.yelp.com/2017/11/code-review-guidelines.html) for best practices.

Each repo has its own deployment process. Currently none of the repos have automatic deployment - everything’s manually deployed to Prod by Eddy. There are tickets for creating Dev + Staging environments along with adding automatic deployments.

## Issues

1. The `tryn-api` repo was recently renamed `opentransit-api`. This will cause an error at the `yarn run relay` command. To fix, rename the `opentransit-api` directory to `tryn-api` by `cd`ing to the parent directory and doing `mv opentransit-api tryn-api`.

## Deployment

TODO
