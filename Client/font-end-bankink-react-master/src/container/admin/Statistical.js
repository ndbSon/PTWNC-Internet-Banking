import React, { useEffect } from 'react';

import Statisticsseens from '../../view/admin/Statistics'
import { useDispatch, useSelector } from 'react-redux';
import { adSTATIS } from '../../action/admin';
import adminApi from '../../api/adminApi'
import moment from 'moment';

Statistics.propTypes = {

};

function Statistics(props) {
    let dispatch= useDispatch();
    let datastatis=useSelector(state=>state.dataStatis);
    async function statis(values){
        // console.log("Values: ",values)
        var a = values.begin+" 00:00:00";
        var b= values.end+" 23:59:59:59";
        values={
            ...values,
            begin:a,
            end:b,
        }
        try {
            let result = await adminApi.statis({...values});
            let tempt = result.map(re=>{
                let t=[];
                t.push(moment(re.Date).format('YYYY-MM-DD'));
                t.push((re.Sum)/1000000);
                t.push(re.count);
                return t;
            })
            // console.log("tempt: ",tempt);
            let action = adSTATIS(tempt);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
    }
    
    return (
        <Statisticsseens statis={statis} datastatis={datastatis}></Statisticsseens>
    );

}

export default Statistics;