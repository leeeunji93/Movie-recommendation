import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import Header from "./Component/header/Header";
import Main from "./Route/Main";
import DropdownList from "./Component/navigate/DropdownList";



class App extends Component {
  render() {
    return (
        <div>
          <h1>사이트 이름</h1>
            <BrowserRouter>
                <Header />
                <Main path='/' exact={true} component={Main} />
                <DropdownList />
            </BrowserRouter>





        </div>
    );
  }
}

export default App;
