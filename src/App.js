import React, { useState } from 'react';
import axios from 'axios';
import {Button, Box, TextField, Typography} from '@material-ui/core';
import WordCloud from './wordcloud';

function App() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');

  async function fetchData() {
    setMessage('loading...');
    const res = await axios.get(url);
    setMessage('complete.');
    setData(res.data);
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
      <Button variant="contained" onClick={() => fetchData()}>
          Submit
      </Button>
      <Typography variant='h6'>{message}</Typography>
      { data && <WordCloud data={data} /> }
    </div>
  );
}

export default App;
