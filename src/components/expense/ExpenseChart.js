import React from 'react';
import { Bar } from 'react-chartjs-2';
import * as moment from 'moment';

export default class RegularExpenseChart extends React.Component {
    
    constructor(props) {
        super(props);

        let month = moment(props.expense.startDate);
        let monthAmount = parseInt(props.expense.months)
        let amount = parseFloat(props.expense.amount)
        let labels = [month.format('MMM YY')]
        let data = [amount]
        var i;
        for (i = 1; i < monthAmount; i++) {
            labels.push(month.add(1, 'month').format('MMM YY'))
            data.push(amount)
        } 

        let currentMonthStart = moment().set({date: 1, hour:0,minute:0,second:0,millisecond:0});
        let currentMonthEnd = moment().set({date: 1, hour:0,minute:0,second:0,millisecond:0}).add({month: 1});
        let backgroundColors = [];
        let borderColors = [];
        month = moment(props.expense.startDate);
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

        let barHeight = parseInt(amount * 1.2);
        
        this.state = {
            labels: labels,
            datasets: [
                {
                    label: "Installment",
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 2,
                    
                    data: data,
                }
            ],
            maxValue: barHeight,
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
                            text:'Regular expense progress',
                            fontSize:25,
                        },
                        legend:{
                            display:false,
                        },
                        scales:{
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    max: this.state.maxValue
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
