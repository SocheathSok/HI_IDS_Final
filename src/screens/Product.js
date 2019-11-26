import React from 'react';
import {Image} from 'react-native';
import {Text, Container, View, Thumbnail} from 'native-base';
export default class Product extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex:1,  justifyContent:'center', alignItems:'center', marginTop:50}}>
                <Image style={{width: 350, height:500}}  source= {require('../img/Funtions.jpg')}>

                </Image>
            </View>
        )}
}