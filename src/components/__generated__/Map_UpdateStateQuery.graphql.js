/**
 * @flow
 * @relayHash d1433f955f8e3872f9e50662fd120bc3
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type Map_UpdateStateQueryResponse = {| |};
*/


/*
query Map_UpdateStateQuery(
  $agency: String!
  $startTime: String!
  $endTime: String!
) {
  ...Map_trynState
}

fragment Map_trynState on Query {
  trynState(agency: $agency, startTime: $startTime, endTime: $endTime) {
    startTime
    endTime
    agency
    routes {
      rid
      stops {
        sid
        lat
        lon
        name
      }
      routeStates {
        vtime
        vehicles {
          vid
          lat
          lon
          heading
        }
      }
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "agency",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "startTime",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "endTime",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "Map_UpdateStateQuery",
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "Map_trynState",
        "args": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "Map_UpdateStateQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "agency",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "startTime",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "endTime",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "Map_UpdateStateQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "agency",
            "variableName": "agency",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "endTime",
            "variableName": "endTime",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "startTime",
            "variableName": "startTime",
            "type": "String!"
          }
        ],
        "concreteType": "TrynState",
        "name": "trynState",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "startTime",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "endTime",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "agency",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Route",
            "name": "routes",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "rid",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Stop",
                "name": "stops",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "sid",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "lat",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "lon",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "RouteState",
                "name": "routeStates",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "vtime",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Vehicle",
                    "name": "vehicles",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "vid",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "lat",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "lon",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "heading",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query Map_UpdateStateQuery(\n  $agency: String!\n  $startTime: String!\n  $endTime: String!\n) {\n  ...Map_trynState\n}\n\nfragment Map_trynState on Query {\n  trynState(agency: $agency, startTime: $startTime, endTime: $endTime) {\n    startTime\n    endTime\n    agency\n    routes {\n      rid\n      stops {\n        sid\n        lat\n        lon\n        name\n      }\n      routeStates {\n        vtime\n        vehicles {\n          vid\n          lat\n          lon\n          heading\n        }\n      }\n    }\n  }\n}\n"
};

module.exports = batch;
