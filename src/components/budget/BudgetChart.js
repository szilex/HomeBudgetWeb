import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

export default class BudgetChart extends React.Component {
    
    constructor(props) {
        super(props);
        
        let budget = props.budget;
        var labels2 = []
        var data = []
        if (budget.customExpenses && budget.customExpenses.length > 0) {
            labels2.push("Custom expenses")
            data.push(budget.customExpenses.reduce(function(prev, current) {
                return prev + Math.round(current.amount * 100.0) / 100
            }, 0.0))
        }
        if (budget.regularExpenses && budget.regularExpenses.length > 0) {
            labels2.push("Regular expenses")
            data.push(budget.regularExpenses.reduce(function(prev, current) {
                return prev + Math.round(current.amount * 100.0) / 100
            }, 0.0))
        }
        if (budget.strategies && budget.strategies.length > 0) {
            labels2.push("Strategies")
            data.push(budget.strategies.reduce(function(prev, current) {
                return prev + Math.round(current.goal * 100.0 / current.months) / 100
            }, 0.0))
        }

        console.log(labels2)
        console.log(data)

        this.state = {
            labels: labels2,
            datasets: [
                {
                    label: "Total",
                    backgroundColor: ['#D32A10', '#52C72F', '#F27919'],
                    borderColor: '#FFFFFF',
                    borderWidth: 2,
                    data: data
                }
            ]
        }
    }

    render() {
        
        return (
            <>
                <Pie
                    data={this.state}
                    options={{
                        title:{
                            display:true,
                            text:'Budget structure',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'bottom'
                        },
                        plugins: {
                            datalabels: {
                                display: true,
                                color: 'white',
                                formatter: (value, context) => {
                                    let sum = 0;
                                    let values = context.chart.data.datasets[0].data;
                                    values.map(data => {
                                        sum += data;
                                        return sum;
                                    });
                                    let percentage = (value*100 / sum).toFixed(2)+"%";
                                    return percentage;
                                },
                            }
                        },
                    }}
                />
            </>
        )
    }
}
