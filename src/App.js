import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {Header, Login, RegisterPage} from './component';
import './App.css'
import './reset.css'
import {MainContainer, MyPageContainer, PosterResultContainer, SearchMovieContainer} from './containers';






const App = () => {
    return (
            <>
            <Header/>
            <Route component={MainContainer} path='/' exact />
            <Route component={Login} path='/Login' />
            <Route component={RegisterPage} path='/RegisterPage' />
            <Route component={PosterResultContainer} path='/PosterResultContainer' />
            <Route component={SearchMovieContainer} path='/SearchMovieContainer' />
            <Route component={MyPageContainer} path='/MyPageContainer' />

            </>
    )
};

export default App;
/*
class App extends Component {
  render() {
    return (
        <div>
            <BrowserRouter>
             <header/>
             <Route path='/' exact={true} component={mainContainer} />
             <Route path='/posterResult' component={posterResult}/>
             <Route path='/SearchMovieContainer' component={SearchMovieContainer}/>
            </BrowserRouter>-


        </div>
    );
  }
}

export default App;
*/
