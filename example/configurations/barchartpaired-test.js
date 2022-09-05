import data from '../datasets/population_2019.csv'
import chart from 'rawcharts/barchartpaired'

export default {
    chart,
    data,
    dataTypes: {
        Year: {
            type: 'date',
            dateFormat: 'YYYY',
        },
        Alter: 'string',
        Maenner: 'number',
        Frauen: 'number',
    },
    mapping: {
        x1: { value: ['Maenner'] },
        //x2: { value: ['Budget (Millions, adjusted for inflation)'] },
        x2: { value: ['Frauen'] },
        y: { value: ['Alter'] },
        // color: { value: ['Genre'] },
    },
    visualOptions: {
        width: 800,
        height: 600,
        padding: 10,
        labelLeftRotation: 45,
        labelLeftAlignment: "start",
        background: 'white',
        title: "COOL PAIRED BAR CHART"
    },
}
