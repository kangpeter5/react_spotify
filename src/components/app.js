import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import searchSpotify from '../utils/searchSpotify';
import SongItem from './SongItem/SongItem';
import styles from './app.css';
import SongList from './SongList/SongList';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      song: '',
      tracks: {},
      songPosition: 0,
    };
  }

  fetchSongs = () => {
    searchSpotify(this.state.song).then(({ tracks }) => this.setState({ tracks }));
      // { tracks: tracks } = { tracks } since the value's and key's names
      // are the same you can get rid of the value and just keep the key
  }

  render() {
    const { tracks, songPosition } = this.state;

    return (
      <div className={styles.root}>
        <SearchBar 
          updateText={(song) => this.setState({ song })} 
          fetchSongs={this.fetchSongs} 
        />
        {tracks.items && <SongItem songData={tracks.items[songPosition]} />}
        {tracks.items && <SongList 
          listOfSongs={tracks.items} 
          selectSong={(songPosition) => this.setState({ songPosition })} 
        />}
      </div>
    );
  }
}
