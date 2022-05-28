import React, { useState, useEffect } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home'
import Game from './pages/Game'
import Leaderboard from './pages/Leaderboard'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



    


function App() {
  return (
  <ApolloProvider client={client}>
    <Router>
      <Navigation/>

      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/game" component={Game} />
        <Route exact path="/leaderboard" component={Leaderboard} />
      </Switch>
      <Footer />
      
    </Router>
  </ApolloProvider>
  );
}

export default App;
