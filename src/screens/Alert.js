import React from 'react'
import { View } from 'native-base';
import Dialog from "react-native-dialog";
export default class Alert extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <Dialog.Container visible={this.props.isShow}>
                    <Dialog.Description>
                        Possible Concussion Detected !
                    </Dialog.Description>
                    <Dialog.Button label="Dismiss" onPress={this.props.close} />
                </Dialog.Container>
            </View>
        )
    }
}