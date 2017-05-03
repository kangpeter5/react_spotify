import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import searchSpotify from '../utils/searchSpotify';
import SongItem from './SongItem/SongItem';
import styles from './app.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialMessage: 'greeting',
      song: '',
      tracks: {},
    };
  }

  fetchSongs = () => {
    searchSpotify(this.state.song)
      // { tracks: tracks } = { tracks } since the value's and key's names
      // are the same you can get rid of the value and just keep the key
      .then(({ tracks }) => this.setState({ tracks }));
  }

  render() {
    const { initialMessage, song, tracks } = this.state;
    console.log ('tracks', tracks);

    return (
      <div className={styles.root}>
        <SearchBar updateText={(song) => this.setState({ song })} fetchSongs={this.fetchSongs} />
        {tracks.items && <SongItem songData={tracks.items[0]} />}
      </div>
    );
  }
}
