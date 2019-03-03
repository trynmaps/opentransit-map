/**
 * @flow
 * @relayHash a99ded55c49ff60a1dbb504adaef7002
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Map_trynState$ref = any;
export type Map_UpdateStateQueryVariables = {|
  agency: string,
  startTime: string,
  endTime: string,
|};
export type Map_UpdateStateQueryResponse = {|
  +$fragmentRefs: Map_trynState$ref
|};
export type Map_UpdateStateQuery = {|
  variables: Map_UpdateStateQueryVariables,
  response: Map_UpdateStateQueryResponse,
|};
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
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lat",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lon",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "Map_UpdateStateQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "Map_trynState",
        "args": null
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "Map_UpdateStateQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "trynState",
        "storageKey": null,
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
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "startTime",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "endTime",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "agency",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "routes",
            "storageKey": null,
            "args": null,
            "concreteType": "Route",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "rid",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "stops",
                "storageKey": null,
                "args": null,
                "concreteType": "Stop",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "sid",
                    "args": null,
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "name",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "routeStates",
                "storageKey": null,
                "args": null,
                "concreteType": "RouteState",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "vtime",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "vehicles",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Vehicle",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "vid",
                        "args": null,
                        "storageKey": null
                      },
                      (v1/*: any*/),
                      (v2/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "heading",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "Map_UpdateStateQuery",
    "id": null,
    "text": "query Map_UpdateStateQuery(\n  $agency: String!\n  $startTime: String!\n  $endTime: String!\n) {\n  ...Map_trynState\n}\n\nfragment Map_trynState on Query {\n  trynState(agency: $agency, startTime: $startTime, endTime: $endTime) {\n    startTime\n    endTime\n    agency\n    routes {\n      rid\n      stops {\n        sid\n        lat\n        lon\n        name\n      }\n      routeStates {\n        vtime\n        vehicles {\n          vid\n          lat\n          lon\n          heading\n        }\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '19cf5e7d9fb1c0af4194cce25d3bafde';
module.exports = node;
