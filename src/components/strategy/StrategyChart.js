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
        
        this.state = {
            labels: labels,
            datasets: [
                {
                    label: "Total",
                    backgroundColor: '#23DAF0',
                    borderColor: '#FD8F49',
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
