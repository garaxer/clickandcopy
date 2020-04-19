import React, { useState } from 'react';
import ImageView from './ImageView';
import Uploader from './Uploader';

import {imageurl, testData} from '../testData';

import { Grid } from '@material-ui/core';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const App = () => {
  const classes = useStyles();

  const [checkForImage, setCheckForImage] = useState(true);
  const [checkForText, setCheckForText] = useState(true);
  const [textColour, setTextColour] = useState('tomato');

  const [imageWidth, setImageWidth] = useState(830);
  const [, ...data] = testData; //first response from G vision is bogus
  
  const handleChange = (event) => {
    setTextColour(event.target.value);
  }
  //<img src="./src/components/1.jpg" />
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      
      <h1>Text Extractor</h1>
      
      <div>
        Image Upload 
        <Uploader />
        <button id="button">Check boxes for options go here</button>

        <p></p>
      </div>
      <div>
        <FormControlLabel
          control={<GreenCheckbox checked={checkForImage} onChange={() => setCheckForImage(!checkForImage)} name="ImageCheck" />}
          label="Show Image"
        />

        <FormControlLabel
          control={<GreenCheckbox checked={checkForText} onChange={() => setCheckForText(!checkForText)} name="TextCheck" />}
          label="Show Text"
        />

        <TextField id="TextColor" label="Text Colour" variant="outlined" onChange={handleChange} value={textColour} size="small"/>
        <div className={classes.root}>
          <Typography id="discrete-slider" gutterBottom>
            Image Width
          </Typography>
          <Slider

            aria-labelledby="discrete-slider"
            //aria-labelledby="range-slider"
            step={100}
            marks
            min={500}
            max={3000}

            value={imageWidth}
            onChange={(event, newValue) => setImageWidth(newValue)}
            valueLabelDisplay="auto"
          />
        </div>
      </div>
      <ImageView
        width={`${imageWidth}px`}
        imageUrl={imageurl}
        textVisible={checkForText}
        imageVisible={checkForImage}
        text={data}
        textColour={textColour}
      />
    </Grid>
  );
}

export default App;
