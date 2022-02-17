import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

const playlistName = 'Chill';
const playlistTracks = [
  {name: 'Tiny Dancer', artist: 'Elton John', album: 'Madman Across The Water', id: '1'},
  {name: 'Tiny Dancer', artist: 'Tim McGraw' , album: 'Love story', id: '2'},
  {name: 'Tiny Dancer', artist: 'Rockabye Baby!', album: 'Lullaby Renditions of Elton John', id: '3'}
]
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar/>
          <div className="App-playlist">
            <SearchResults resultList={this.state.searchResults}/>
            <Playlist playlistName={playlistName} playlistTracks={playlistTracks}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;