import axios from 'axios';

export default () => {
  const query = `{
    trynState(agency: "muni", startTime: "1508381633785") {
      agency
      startTime
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
  }`;
  axios.post('http://35.192.24.65/graphql/', { query })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
};
