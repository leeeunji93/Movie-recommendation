### Movie-recommendation 


dropdown 두가지 방법

```javascript

import React, {Component} from 'react';
/*import { Dropdown } from 'semantic-ui-react'*/
import {Link} from "react-router-dom";
import Header from "../Header/Header";

class DropdownList extends Component{

    state = {
        vibe:'',
        situations:['a','b','c'],
        search:''
    };

    handleChange= e => {
        this.setState({
    [e.target.name]: e.target.value
        });
    }


   handleSubmit = e => {
       e.preventDefault();
   }

    render(){
        const { vibe , situation ,search} =this.state;
        return(
            <div>
                <form onSubmit={this.handleSubmit} >
                    <label>
                        오늘 나는
                        <select
                            name='vibe'
                            value={vibe}
                            onChange={this.handleChange}
                            placeholder={vibe}
                        >
                            <option value="grapefruit">Grapefruit</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>
                    </label>
                    <label>
                        <select>
                            {this.state.situations.map(situation => (
                                <option key={situation} value={situation}>
                                    {situation}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">등록</button>
                    <br/>
                    <br/>
                    <input
                        name='search'
                        placeholder='영화 제목, 아이디,'
                        onChange={this.handleChange}
                        value={search}
                    />
                    <button type="submit">등록</button>
                </form>
            </div>
        )
    }
}

export default DropdownList;

```

