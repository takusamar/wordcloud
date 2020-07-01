import React, { useEffect, useState } from 'react';
import D3Cloud from 'react-d3-cloud';
import axios from 'axios';
import {Button, Box, TextField, Typography} from '@material-ui/core';

const fontSizeMapper = word => Math.pow(word.value, 0.8) * 10;
const rotate = word => word.value % 2 === 1 ? 0 : 90;
const fontFamily = 'meiryo';

function countWord(array){
  const words = [...new Set(array)];
  console.log(words);
  const wordData = words.map((text) => {
    return {
      text: text,
      value: array.filter((v) => v === text).length,
    };
  });
  console.log(wordData);
  return wordData;
}

export default () => {
  const [wordData, setWordData] = useState(null);
  const [url, setUrl] = useState(null);
  const [dataKey, setDataKey] = useState(null);

  async function fetchData() {
    const res = await axios.get(url);
    const data = res.data.map((row)=>{
      return row[dataKey];
    });
    const wordData = countWord(data);
    setWordData(wordData);
  }
  
  return (
    <div>
      <Typography variant='h4'>wordcloud</Typography>
      <Box m={1} />
      <TextField
        value={url}
        label="JSON Web API" 
        onChange={e => setUrl(e.target.value)}
      />
      <Box m={1} />
      <TextField
        value={dataKey}
        label="data key" 
        onChange={e => setDataKey(e.target.value)}
      />
      <Box m={1} />
      <Button variant="contained" onClick={() => fetchData()}>
          Submit
      </Button>

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
