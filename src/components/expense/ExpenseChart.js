import React from 'react';
import { Bar } from 'react-chartjs-2';
import * as moment from 'moment';

export default class RegularExpenseChart extends React.Component {
    
    constructor(props) {
        super(props);

        var month = moment(props.expense.startDate);
        let monthAmount = parseInt(props.expense.months)
        let amount = parseFloat(props.expense.amount)
        var labels = [month.format('MMM YY')]
        var data = [amount]
        var i;
        for (i = 1; i < monthAmount; i++) {
            labels.push(month.add(1, 'month').format('MMM YY'))
            data.push(amount)
        } 
        let barHeight = parseInt(amount * 1.2);
        
        this.state = {
            labels: labels,
            datasets: [
                {
                    label: "Installment",
                    backgroundColor: '#23DAF0',
                    borderColor: '#FD8F49',
                    borderWidth: 2,
                    data: data
                }
            ],
            maxValue: barHeight
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
                                    beginAtZero: true,
                                    max: this.state.maxValue
                                }
                            }]
                        }
                    }}
                />
            </>
        )
    }
}
