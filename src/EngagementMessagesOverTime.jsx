import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import "./App.css"

const EngagementMessagesOverTime = ({ messageCountList, channels }) => {
  const series = useMemo(() => {
    return channels.map(channel => {
      const data = messageCountList
        .filter(message => message.channelId === channel.id)
        .map(message => [new Date(message.timeBucket).getTime(), parseInt(message.count, 10)]);

      return {
        name: channel.name,
        data,
      };
    });
  }, [messageCountList, channels]);

  const options = useMemo(() => {
    return {
      title: {
        text: 'Engagement Messages Over Time',
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: 'Messages Count',
        },
      },
      series,
    };
  }, [series]);

  if (!messageCountList || !channels || messageCountList.length === 0 || channels.length === 0) {
    return <div>Error: Invalid Data</div>;
    //we can add specific errors according to the need in here
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementMessagesOverTime;
