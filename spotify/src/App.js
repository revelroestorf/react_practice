import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    searchInput: '',
    songs: [
      {artist: 'Kanye',   title: 'Touch the sky'},
      {artist: 'Bruce',   title: 'Jesus walks'},
      {artist: 'Sam',     title: 'Gold digger'},
      {artist: 'Charlie', title: 'Dog fight'},
      {artist: 'Ron',     title: 'Alpine forest'}
    ]
  }

  // updateName = (event) => {
  //   // console.log(event.target.value)
  //     // this.state.name = 'something'
  //   this.setState({
  //     name: event.target.value
  //   })
  // }

// refactor to take call back filter func
  updateSearchInput = (event) => {
    this.setState({
      searchInput: event.target.value
    })
  }

  songFilter = () => {
    if (this.state.searchInput == '') return this.state.songs
    var filteredSongs = []
    for (let song of this.state.songs) {
      if (song.artist.toLowerCase().includes(this.state.searchInput.toLowerCase()) ||
          song.title.toLowerCase().includes(this.state.searchInput.toLowerCase())
         ) {
        filteredSongs.push(song)
      }
    }
    return filteredSongs
  }

  render() {
    // const songs = this.state.songs.filter(song => {
    //   song.toLowerCase().includes(this.state.filter.toLowerCase())
    // }
    return (
      <div className="App">
        <h1>Spotify</h1>
        <form>
          <label htmlFor="search">Search for song:</label>
          <input id="search" onChange={ this.updateSearchInput }/>
        </form>
        { this.songFilter().map( song => <p><span>{song.title}</span><span> by {song.artist}</span></p> ) }
      </div>
    );
  }
}
// { (filteredSongs.length) ?
//   filteredSongs.map( song => <p><span>{song.title}</span><span> by {song.artist}</span></p> ) :
//   this.state.songs.map( song => <p><span>{song.title}</span><span> by {song.artist}</span></p> )
// }

export default App;
