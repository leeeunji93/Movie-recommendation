import React, {Component} from 'react';
import {Link} from "react-router-dom";


class DropdownList extends Component{

    state = {
        vibes:[1,2,3],
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
        const { search } =this.state;
        return(
            <div>
                <form onSubmit={this.handleSubmit} >
                    <label>
                        오늘 나는
                        <select>
                            {this.state.vibes.map(vibe => (
                                <option key={vibe} value={vibe}>
                                    {vibe}
                                </option>
                            ))}
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
                    <Link to='#'>
                    <button type="submit">등록</button>
                    </Link>
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








