import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(trackToSave) { //Add tracks from search result to playlist
    let tracks = this.state.playlistTracks;
    if (tracks.find(track => track.id  === trackToSave.id)) {
      return; //break out of the method if track already exists in Playlist
    }
    tracks.push(trackToSave);
    this.setState({
      playlistTracks: tracks 
    });
  }

  removeTrack(trackToRemove) { //Remove tracks from playlist (and add to search result if it originates from there)
    let tracks = this.state.playlistTracks;
    if (!tracks.find(track => track.id === trackToRemove.id)) {
      return;
    }
    let newTracks = tracks.filter(track => track.id !== trackToRemove.id);
    this.setState({
      playlistTracks: newTracks
    });
  }

  updatePlaylistName(name) { //Update playlist's name
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {//array of tracks' URI to save playlist to a user's account
    const trackURIs = this.state.playlistTracks.map(track => track.uri); 
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    });
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    }
  );

  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults resultList={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist 
              name={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;