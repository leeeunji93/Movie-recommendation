import React, { Component } from 'react';
import axios from 'axios';
import SearchMovie from "../../component/SearchMovie/SearchMovie";

class SearchMovieContainer extends Component {
    state = {
        isLoading: true,
        movies:[],
        value:""
    };

    getMovies = async () => {
        const ID_KEY = 'WFQJOYSX3aTpQkrA1rRZ';
        const SECRET_KEY = 'Pm1ClFnzq_';
        const search = this.state.value; 
        try { 
            if (search === "") { 
                this.setState({movies: [], isLoading: false})
            } else {
                const {data: { items }} = await axios.get
                ('https://openapi.naver.com/v1/search/movie.json',
                    { params:{ query: search, display: 6 },
                        headers: { 
                            'X-Naver-Client-Id': ID_KEY, 
                            'X-Naver-Client-Secret': SECRET_KEY }
                    }); 
                this.setState({
                    movies: items, isLoading: false});
            }
        } 
        catch (error) {
             console.log(error);
        }
    };

    componentDidMount() {
      this.getMovies();
    }

    handleChange = (e) => {
        this.setState({
            value:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.getMovies();
    }

    render() {
        const {isLoading, movies, value} = this.state;
        return (
            <div className='SearchMovieContainer'>
                {
                    isLoading
                        ? (<div className='SearchMovie_loading'>
                            <span className='SearchMovie_text'>Loading</span>
                        </div>)
                        : (<form onSubmit={this.handleSubmit}>
                            <div>
                                <div className='SearchMovie_inputContainer'>
                                    <h1>영화 검색</h1>
                                    <input
                                        className='SearchMovie_input'
                                        type='text'
                                        value={value}
                                        onChange={this.handleChange}
                                        placeholder='작성하실 영화를 검색하세요'/>
                                </div>
                                <div className='SearchMovie_movies'>
                                    {movies.map(movie => (
                                        <SearchMovie
                                            key={movie.link}
                                            id={movie.link}
                                            poster={movie.image}
                                            title={movie.title}
                                            director={movie.director}
                                            actor={movie.actor}
                                        />))
                                    }
                                </div>
                            </div>
                        </form>)
                }
            </div>
        );
    }
}

export default SearchMovieContainer;




