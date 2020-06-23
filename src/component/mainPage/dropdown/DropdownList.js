import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import './DropdownList.scss';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

/*styles*/

/*다음에 태그를 끌어와서 진행한다*/
const vibes = [
  {
    value: '짜증난',
    label: '짜증난',
  },
  {
    value: '우울한',
    label: '우울한',
  },
  {
    value: '권태로운',
    label: '권태로운',
  },
  {
    value: '심쿵하는',
    label: '심쿵하는',
  },
];

const situationAll = [
  {
    value: '마약하는',
    label: '마약하는',
  },
  {
    value: '악당과 싸우는',
    label: '악당과 싸우는',
  },
  {
    value: '살해당하는',
    label: '살해당하는',
  },
  {
    value: '우주로 떠나는',
    label: '우주로 떠나는',
  },
];

const DropdownList = () => {
  const [textField, setTextField] = useState('');

  const handleChange = (e) => {
    setTextField({
      ...textField,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="header_dropdown">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} lg={6} md={6} sm={6}>
            <TextField
              name="vibe"
              id="outlined-select-currency"
              select
              label="Vibe"
              value={textField}
              onChange={handleChange}
              variant="outlined"
            >
              {vibes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} lg={6} md={6} sm={6}>
            <TextField
              name="situation"
              id="outlined-select-currency"
              select
              label="Situation"
              value={textField}
              onChange={handleChange}
              variant="outlined"
            >
              {situationAll.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </form>
      <div className="button">
        <Link to="/SearchMovieContainer">볼래 ! </Link>
      </div>
    </div>
  );
};

export default DropdownList;
/*
class DropdownList extends Component {
    state = {
      vibes: ['짜증난', '권태로운', '후회하는'],
      situations: ['마약 하는', '정체성을 찾는 ', '꿈 속에 빠진'],
    };

   /!* handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
*!/

    handleSubmit = (e) => {
      e.preventDefault();
    }

    render() {
      const { vibes,situations } = this.state;
      return (
            <div className='tag_Wrapper'>
                <form
                    className='tag_form'
                    onSubmit={this.handleSubmit}>
                    <label className='tag_vibes'>
                        <span className='tag_vibes_text'>오늘 나는</span>
                        <select className='tag_dropdown'>
                            {vibes.map((vibe) => (
                                <option
                                    key={vibe}
                                    value={vibe}>
                                    {vibe}
                                </option>
                            ))}
                        </select>
                        <span className='tag_vibes_text'>주인공이</span>
                    </label>
                    <label className='tag_situations'>
                        <select className='tag_dropdown'>
                            {situations.map((situation) => (
                                <option key={situation} value={situation}>
                                    {situation}
                                </option>
                            ))}
                        </select>
                    </label>
                    <Link
                        to='#'
                        className='tag_button'
                    >
                        <button type="submit"> 영화 볼래 </button>
                    </Link>
                   {/!* <input
                        name='search'
                        placeholder='영화 제목, 아이디,'
                        onChange={this.handleChange}
                        value={search}
                    />
                    <Link to='/searchContainer'>
                    <button type="submit">등록</button>
                    </Link>*!/}
                </form>
            </div>
      );
    }
}

export default DropdownList;
*/
