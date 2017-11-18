import React, {Component} from 'react';
import {
  QueryRenderer,
  graphql
} from 'react-relay';
import environment from './relayComponents/environment';
import App from './App';


// Higher order GraphQL query const,
// $startTime sets current time in milliseconds
const AppRendererQuery = graphql`
    query AppRendererQuery($startTime: String!) {
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
`;


class AppRenderer extends Component {
  render() {
    return (
      <div>
        <QueryRenderer
          environment={environment}
          query={AppRendererQuery}
          variables={{startTime: (new Date()).getTime()}}
          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>;
            } else if (props) {
              return <App viewer={props.trynState}/>;
            }
            return <div>Loading</div>;
          }}
        />
      </div>
    );
  }
}

export default AppRenderer;