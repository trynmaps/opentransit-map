/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Map_trynState = {|
  +trynState: ?{|
    +startTime: ?string;
    +endTime: ?string;
    +agency: ?string;
    +routes: ?$ReadOnlyArray<?{|
      +rid: ?string;
      +stops: ?$ReadOnlyArray<?{|
        +sid: ?string;
        +lat: ?number;
        +lon: ?number;
        +name: ?string;
      |}>;
      +routeStates: ?$ReadOnlyArray<?{|
        +vtime: ?string;
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


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "agency",
      "type": "String!"
    },
    {
      "kind": "RootArgument",
      "name": "startTime",
      "type": "String!"
    },
    {
      "kind": "RootArgument",
      "name": "endTime",
      "type": "String!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Map_trynState",
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
  ],
  "type": "Query"
};

module.exports = fragment;
