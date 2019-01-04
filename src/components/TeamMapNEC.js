import React from 'react';
import { VectorMap } from 'react-jvectormap';

export default class TeamMapNEC extends React.Component {

  render(){
    console.log('[NECMAP]')
    const selectedRegions = ["US-MD","US-NY","US-NJ","US-MA","US-PA","US-DE","US-RI","US-CT"];
    const { clickedTeam, conferenceFilter, selectedTeamMap, teamAbbreviations, removeMarker } = this.props;
    const regionControls = {
      initial: {
        fill: '#175c98',
        "fill-opacity": 1,
        stroke: 'none',
        "stroke-width": 0,
        "stroke-opacity": 1
      },
      hover: {
        "fill-opacity": 0.8,
        cursor: 'pointer'
      },
      selected: {
        fill: 'yellow',
        "fill-opacity": 1
      },
      selectedHover: {
      }
    };
  
    let map = <VectorMap map={ "us_aea" }
                   backgroundColor='#fff'
                   ref='map'
                   zoomOnScroll={false}
                   containerStyle={{
                       width: '100%',
                       height: '100%',
                       padding: '5%'
                   }}
                   regionsSelectable={true}
                   regionsSelectableOne={true}
                   regionStyle={regionControls}
                   containerClassName="map"
                   onRegionClick={ clickedTeam }
                   selectedRegions= { selectedRegions }
                   selectedMarkers= { [] }
        />;

    removeMarker();
   
    return (
  	  <div style={{width: '100%', height: 500}}>
        { map }
      </div>
    );
  }
}