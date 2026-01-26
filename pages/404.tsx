import type { NextPage } from 'next';

const NotFound: NextPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
    </div>
  );
};

export default NotFound;
