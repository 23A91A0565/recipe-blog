import type { NextPage } from 'next';

const ServerError: NextPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>500 - Server Error</h1>
      <p>Sorry, something went wrong on the server.</p>
    </div>
  );
};

export default ServerError;
