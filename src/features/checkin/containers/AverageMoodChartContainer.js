import React from 'react';
import AverageMoodChart from '../components/AverageMoodChart';

class AverageMoodChartContainer extends React.Component {
  render() {
    if (!this.props.checkins || !this.props.checkins.length) {
      return null;
    }

    let checkins = this.props.checkins;

    let data = [
      { mood: 1, tally: 0, percentage: 0 },
      { mood: 2, tally: 0, percentage: 0 },
      { mood: 3, tally: 0, percentage: 0 },
      { mood: 4, tally: 0, percentage: 0 },
      { mood: 5, tally: 0, percentage: 0 },
      { mood: 6, tally: 0, percentage: 0 },
      { mood: 7, tally: 0, percentage: 0 },
    ];

    // Transform checkins to pie chart data
    for (let i = 0; i < checkins.length; i++) {
      const mood = checkins[i].mood;
      data[mood - 1].tally = data[mood - 1].tally + 1;
    }

    // Remove empty rows
    const filteredData = data.filter(obj => obj.tally > 0);

    // Calculate total number of checkins
    const total = filteredData.reduce((total, value) => total + value.tally, 0);

    // Add percentages
    const dataWithPercentages = filteredData.map(obj => {
      obj.percentage = Math.round((obj.tally / total) * 100);
      return obj;
    });

    // Work out modalAverage
    const maxItem = dataWithPercentages.reduce(function(a, b) {
      return a.tally > b.tally ? a : b;
    }, {});
    const modalAverage = maxItem.mood;

    return (
      <AverageMoodChart data={dataWithPercentages} total={total} modalAverage={modalAverage} />
    );
  }
}

export default AverageMoodChartContainer;
