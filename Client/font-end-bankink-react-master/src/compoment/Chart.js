import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Chart } from "react-google-charts";
import PropTypes from 'prop-types';
import Title from './Title';

Charts.propTypes = {
    datastatis:PropTypes.array,
  };
  Charts.defaultProps = {
    datastatis:[]
  }

export default function Charts(props) {
    const theme = useTheme();
    let {datastatis}=props;
    
    console.log("datastatis: ",datastatis)

    return (
        <React.Fragment>
           {datastatis.length!==0 ?<Chart
            width={'1200px'}
            height={'500px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Date', 'Amount (Trieu VND)','Request'],
                   ...datastatis
                ]}
                options={{
                    title: 'Statis',
                    hAxis: {
                        title: 'Date',
                    },
                    vAxis: {
                        title: 'Statis',
                        minValue: 0 
                    },
                }}
                rootProps={{ 'data-testid': '1' }}
            /> : ''}
        </React.Fragment>
    );
}