// pages/home.js
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loading from '../components/Loading';

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignIn = () => {
    signIn('google'); // You can replace 'google' with the desired authentication provider
  };

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    return (
      <div>
        <h1>Login</h1>
        <p>Please sign in to access the home screen.</p>
        <button onClick={handleSignIn}>Sign in with Google</button>
        {/* Add more sign-in options/buttons as needed */}
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to the Home Screen!</h1>
      <p>Hello, {session.user.name}!</p>
      {/* Your home screen content goes here */}
    </div>
  );
};

export default Home;
