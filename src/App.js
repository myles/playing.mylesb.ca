import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
`;

const TrackList = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: 1rem;
  justify-content: center;
`

const Track = styled.div`
  display: block;
  background-color: rgb(0, 0, 0, 50%);
  text-align: center;
  margin: 25px 15px;
  max-width: 300px;
  padding-bottom: 5px;

  ${props => props.nowplaying && css`
    animation: ${pulseAnimation} 2s linear infinite;
  `}
`;

const TrackImage = styled.img`
  margin-bottom: 5px;
`;

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
          return <Track key={index} nowplaying={track["@attr"] ? true : false}>
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
