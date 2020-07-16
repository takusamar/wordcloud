import React, { useEffect, useState } from 'react';
import D3Cloud from 'react-d3-cloud';
import {Box, Typography, Select, MenuItem} from '@material-ui/core';

const fontSizeMapper = word => Math.pow(word.value, 0.8) * 10;
// const rotate = word => word.value % 2 === 1 ? 0 : 90;
const rotate = 0;
const fontFamily = 'meiryo';

function countWord(array){
  const words = [...new Set(array)];
  const wordData = words.map((text) => {
    return {
      text: text,
      value: array.filter((v) => v === text).length,
    };
  });
  return wordData;
}

export default ({data}) => {
  const [wordData, setWordData] = useState([]);
  const [dataKey, setDataKey] = useState('');
  const [cols, setCols] = useState([]);

  const handleChange = (event) => {
    setDataKey(event.target.value);
  };

  function parseColumn(data) {
    const pattern = /\d\. /;
    const items = Object.keys(data[0]).filter((v) => v.match(pattern));
    setCols(items);
  }

  function parseData(data, dataKey) {
    const rows = data.map((row)=>{
      return row[dataKey];
    });
    const wordData = countWord(rows);
    setWordData(wordData);
  }
  
  useEffect(()=>{
    if (!!data) {
      parseColumn(data);
    }
  },[data]);

  useEffect(()=>{
    if (!!data && !!dataKey) {
      parseData(data, dataKey);
    }
  }, [data, dataKey]);

  return (
    <div>
      <Box m={1} />

      {cols && 
        <Select id="colName" value={dataKey} onChange={handleChange}>
          {cols.map((v, i) => 
            <MenuItem key={i} value={v}>{v}</MenuItem>            
          )}
        </Select>
      }

    {dataKey && <Typography variant="h6">{dataKey}</Typography>}

      {wordData && <Box>
        <D3Cloud 
          data={wordData}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}
          font={fontFamily}
        />
      </Box>}

    </div>
  );
};
