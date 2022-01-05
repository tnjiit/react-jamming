import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchResults:[],
            playlistName: 'Bang Bang!',
            playlistTracks: [
                {
                    id: 'A_id',
                    name: 'A_name',
                    album: 'A_album',
                    artist: 'A_artist'
                },
                {
                    id: 'B_id',
                    name: 'B_name',
                    album: 'B_album',
                    artist: 'B_artist'
                },
                {
                    id: 'C_id',
                    name: 'C_name',
                    album: 'C_album',
                    artist: 'C_artist'
                }
            ]
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack(track){
        if(this.state.playlistTracks.find(itertrack => itertrack.id === track.id)){
            console.log('Do Nothing');
            return;
        }
    }

    removeTrack(track){
        this.setState({
            playlistTracks: this.state.playlistTracks.filter(itertrack => itertrack.id !== track.id)
        });
    }

    render(){
        return (
                <div>
                    <h1>Ja<span className="highlight">mmm</span>ing</h1>
                    <div className="App">
                        <SearchBar />
                        <div className="App-playlist">
                            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
                        </div>
                    </div>
                </div>
        );
    }
}

export default App;
