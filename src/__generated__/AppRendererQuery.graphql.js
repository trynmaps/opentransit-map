/**
 * @flow
 * @relayHash 8e5135ef99f3ad4b86776d4ee4b2bddc
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type AppRendererQueryResponse = {|
  +trynState: ?{|
    +agency: ?string;
    +startTime: ?string;
    +endTime: ?string;
    +states: ?$ReadOnlyArray<?{|
      +time: ?string;
      +routes: ?$ReadOnlyArray<?{|
        +name: ?string;
        +vehicles: ?$ReadOnlyArray<?{|
          +vid: ?string;
          +lat: ?number;
          +lon: ?number;
          +heading: ?number;
        |}>;
      |}>;
    |}>;
  |};
|};
*/


/*
query AppRendererQuery(
  $startTime: String!
) {
  trynState(agency: "muni", startTime: $startTime) {
    agency
    startTime
    endTime
    states {
      time
      routes {
        name
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
        "name": "startTime",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppRendererQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "agency",
            "value": "muni",
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
            "name": "agency",
            "storageKey": null
          },
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
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "State",
            "name": "states",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "time",
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
                    "name": "name",
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
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "AppRendererQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "startTime",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "AppRendererQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "agency",
            "value": "muni",
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
            "name": "agency",
            "storageKey": null
          },
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
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "State",
            "name": "states",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "time",
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
                    "name": "name",
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
  "text": "query AppRendererQuery(\n  $startTime: String!\n) {\n  trynState(agency: \"muni\", startTime: $startTime) {\n    agency\n    startTime\n    endTime\n    states {\n      time\n      routes {\n        name\n        vehicles {\n          vid\n          lat\n          lon\n          heading\n        }\n      }\n    }\n  }\n}\n"
};

module.exports = batch;
