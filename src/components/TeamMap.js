import React from 'react';
import { VectorMap } from 'react-jvectormap';

export default class TeamMap extends React.Component {

    render(){

      const { map, clickedTeam, selectedConferenceMap } = this.props;
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

      return (
    	  <div style={{width: '100%', height: 500}}>
          <VectorMap map={ map }
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
          />
        </div>
      );
    }
}