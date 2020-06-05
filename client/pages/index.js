import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in!</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

// anything we return in getInitialProps, will be props for our main component
// so if we need data while SSR, we need to make server requests in this function
// Once everything is loaded, then this function doesn't really have a purpose
// At that point, would just fetch data normally inside the component
LandingPage.getInitialProps = async context => {
  console.log('LANDING PAGE');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
