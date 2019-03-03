/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Map_trynState$ref: FragmentReference;
export type Map_trynState = {|
  +trynState: ?{|
    +startTime: ?string,
    +endTime: ?string,
    +agency: ?string,
    +routes: ?$ReadOnlyArray<?{|
      +rid: ?string,
      +stops: ?$ReadOnlyArray<?{|
        +sid: ?string,
        +lat: ?number,
        +lon: ?number,
        +name: ?string,
      |}>,
      +routeStates: ?$ReadOnlyArray<?{|
        +vtime: ?string,
        +vehicles: ?$ReadOnlyArray<?{|
          +vid: ?string,
          +lat: ?number,
          +lon: ?number,
          +heading: ?number,
        |}>,
      |}>,
    |}>,
  |},
  +$refType: Map_trynState$ref,
|};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lat",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lon",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Map_trynState",
  "type": "Query",
  "metadata": null,
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
                (v0/*: any*/),
                (v1/*: any*/),
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
                    (v0/*: any*/),
                    (v1/*: any*/),
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
        }
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a49313a4df98c378116752a0306c53e6';
module.exports = node;
