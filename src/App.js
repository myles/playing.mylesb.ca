import React, { Component } from 'react';
import styled from 'styled-components';

const TrackList = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: 1rem;
  justify-content: center;
`

const Track = styled.div`
  display: block;
  text-align: center;
  margin-right: 2rem;
  max-width: 300px;
`;

const TrackImage = styled.img``;

const TrackBody = styled.div`
  max-width: 275px;
`;

const TrackName = styled.h1`
  font-size: 1.1rem;
  margin: 0;
  margin-bottom: .25rem;
`;

const TrackArtist = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  margin: 0;
`;

class App extends Component {
  state = {
    'playing': []
  }

  async getPlaying() {
    let resp = await fetch('/.netlify/functions/playing');
    let playing = await resp.json();

    this.setState({
      'playing': playing
    });
  }

  constructor(props) {
    super(props);
    this.getPlaying();
  }

  render() {
    return (
      <TrackList>
        {this.state.playing.map(function(track, index) {
          return <Track key={index}>
            <TrackImage src={track.image[3]["#text"]} />
            <TrackBody>
              <TrackName>{track.name}</TrackName>
              <TrackArtist>{track.artist["#text"]}</TrackArtist>
            </TrackBody>
          </Track>
        })}
      </TrackList>
    );
  }
}

export default App;
