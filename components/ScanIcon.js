import React from 'react';
import { Image } from 'react-native';

export default class ScanIcon extends React.Component {
  render() {
    return (
      <Image 
      source ={require('../assets/images/icons8-compact-camera-64.png')}
      style={{width:30, height:30}}
      />
    );
  }
}