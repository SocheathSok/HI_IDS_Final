import React from 'react'
import { Text, View } from 'native-base'
import DataManager from '../DataManager'
import { LineChart, Grid, YAxis } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { Dimensions, StyleSheet } from 'react-native'



export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.dataManager = DataManager.getInstance()

        this.state = {
            data: []
        }

    }
    componentDidMount() {
        this.Interval = setInterval(() => {
            this.setState({ data: this.dataManager.storage.slice(-1000) })
        }, 100)
    }
    componentWillUnmount() {
        clearInterval(this.Interval)
    }

    render() {
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
                    <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
                </LinearGradient>
            </Defs>
        )

        return (
            <View style={{ height: Dimensions.get('window').height * 0.9, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    data={[0, 200]}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                    yMin={0}
                    yMax={200}
                    numberOfTicks={20}
                />
                <View style={{ flex: 1, marginBottom: 30, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={this.state.data}
                        contentInset={verticalContentInset}
                        svg={{
                            strokeWidth: 2,
                            stroke: 'url(#gradient)',
                        }}
                        yMin={0}
                        yMax={200}
                    >
                        <Grid />
                        <Gradient />
                    </LineChart>

                    <LineChart
                        style={{ flex: 1}, StyleSheet.absoluteFill }
                        data={[100,100]}
                        contentInset={verticalContentInset}
                        svg={{
                            strokeWidth: 2,
                            stroke: 'rgba(1000, 0, 0, 1)'
                        }}
                        yMin={0}
                        yMax={200}
                    >
                        <Grid />
                    </LineChart>
                </View>
            </View>
        )



    }
}