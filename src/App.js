import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Header } from './component';
import {MainContainer, PosterResultContainer,SearchMovieContainer } from './containers';


class App extends Component {
  render() {
    return (
        <div>
          <h1>사이트 이름</h1>
            <BrowserRouter>
             <Header/>
             <Route path='/MainContainer' exact={true} component={MainContainer} />
             <Route path='/PosterResultContainer' component={PosterResultContainer}/>
             <Route path='/SearchMovieContainer' component={SearchMovieContainer}/>
            </BrowserRouter>-


        </div>
    );
  }
}

export default App;
