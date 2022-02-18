import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {name: 'Tiny Dancer 1', artist: 'Elton John', album: 'Madman Across The Water', id: '1'},
        {name: 'Tiny Dancer 2', artist: 'Tim McGraw' , album: 'Love story', id: '2'},
        {name: 'Tiny Dancer 3', artist: 'Rockabye Baby!', album: 'Lullaby Renditions of Elton John', id: '3'}
      ],
      playlistName: 'Chill',
      playlistTracks: [
        {name: 'playlist1', artist: 'artist1', album: 'album1', id: '4'},
        {name: 'playlist2', artist: 'artist2', album: 'album2', id: '5'},
        {name: 'playlist3', artist: 'artist3', album: 'album3', id: '6'}
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
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

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar/>
          <div className="App-playlist">
            <SearchResults resultList={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist 
              name={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;