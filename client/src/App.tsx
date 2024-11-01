// App.tsx

import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Auth from './utils/auth';

// PrivateRoute component to protect certain routes
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return Auth.loggedIn() ? children : <Navigate to="/login" />;
};

// Construct the main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct middleware to attach JWT token to each request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Set up Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SearchBooks />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Route for Saved Books */}
          <Route
            path="/saved"
            element={
              <PrivateRoute>
                <SavedBooks />
              </PrivateRoute>
            }
          />

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
