import React from 'react';
import { VectorMap } from 'react-jvectormap';

export default class TeamMap extends React.Component {
  render(){
    console.log('[MAP]')
    const { clickedTeam, teamAbbreviations, removeMarker } = this.props;
    let selectedTeamMap = this.props.selectedTeamMap;
    var selectedRegions = [];
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
    console.log(selectedTeamMap)
    if(selectedTeamMap !== ""){
      for(var team in teamAbbreviations){
        console.log(teamAbbreviations[team]);
        if(teamAbbreviations[team] === selectedTeamMap){
          selectedRegions.push("US-" + team);
        }else if(selectedTeamMap.indexOf("California") != -1){
          selectedRegions.push("US-CA");
        }
      }
    }
    let map_us = <VectorMap map={ "us_aea" }
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
        { map_us }
      </div>
    );
  }
}