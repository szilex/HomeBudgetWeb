import React from 'react';
import { Bar } from 'react-chartjs-2';
import * as moment from 'moment';

export default class StrategyChart extends React.Component {
    
    constructor(props) {
        super(props);

        var month = moment(props.strategy.startDate);
        let monthAmount = parseInt(props.strategy.months)
        let goal = parseFloat(props.strategy.goal)
        let installment = Math.round(goal * 100.0 / monthAmount) / 100
        var labels = [month.format('MMM YY')]
        var data = [installment]
        var i;
        for (i = 1; i < monthAmount; i++) {
            labels.push(month.add(1, 'month').format('MMM YY'))
            data.push(installment * (i+1.0))
        } 
        data[monthAmount - 1] = goal

        let currentMonthStart = moment().set({date: 1, hour:0,minute:0,second:0,millisecond:0});
        let currentMonthEnd = moment().set({date: 1, hour:0,minute:0,second:0,millisecond:0}).add({month: 1});
        let backgroundColors = [];
        let borderColors = [];
        month = moment(props.strategy.startDate);
        for (i = 0; i < monthAmount; i++, month.add(1, 'month')) {
            if (currentMonthStart.isAfter(month)) {
                backgroundColors.push('rgba(82,199,47,0.3)')
                borderColors.push('rgba(82,199,47,1)')
            }
            else if(currentMonthEnd.isSameOrBefore(month)) {
                backgroundColors.push('rgba(19,199,255,0.3)')
                borderColors.push('rgba(19,199,255,1)')
            } else {
                backgroundColors.push('rgba(211,42,16,0.3)')
                borderColors.push('rgba(211,42,16,1)')
            }
        }
        
        this.state = {
            labels: labels,
            datasets: [
                {
                    label: "Total",
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 2,
                    data: data
                }
            ]
        }
    }

    render() {
        
        return (
            <>
                <Bar
                    data={this.state}
                    options={{
                        title:{
                            display:true,
                            text:'Strategy progress',
                            fontSize:20
                        },
                        legend:{
                            display:false,
                            position:'right'
                        },
                        scales:{
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        plugins: {
                            datalabels: {
                                display: false,
                            }
                        },
                    }}
                />
            </>
        )
    }
}
