import React, { useState } from 'react';
import ImageView from './ImageView';
import Uploader from './Uploader';

import { testimageurl, testData } from '../testData';

import { Grid } from '@material-ui/core';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Draggable from 'react-draggable';

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
    margin: 'auto'
  },
});

const App = () => {
  const classes = useStyles();

  const [checkForImage, setCheckForImage] = useState(true);
  const [checkForText, setCheckForText] = useState(true);
  const [textColour, setTextColour] = useState('tomato');

  const [imageUrl, setImageUrl] = useState(testimageurl);
  const [textData, setTextData] = useState(testData);

  const [textAreaValue, setTextAreaValue] = useState('');
  const [next, setNext] = useState(0);

  //let newText = text.split('\n').map((item, i) => {
  //  return <p key={i}>{item}</p>;
  //});
  const handleTextClick = (text) => {
    const map = [',', ',']

    setTextAreaValue(textAreaValue + text + map[next])

    setNext(next === 1 ? 0 : next + 1)
  }

  /* Gets called upon filedupload, only one dispatch in this app so we aren't filtering by payload type */
  const dispatch = ({ url, data }) => {
    console.log(url, data)
    const [, ...textData] = data
    console.log('data')

    console.log(data)
    console.log(textData)

    setImageUrl(url)
    setTextData(textData)
  }


  const [imageWidth, setImageWidth] = useState(830);
  //const [, ...textData] = ; //first response from G vision is bogus

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
        <Uploader parentDispatch={dispatch} />
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

        <TextField id="TextColor" label="Text Colour" variant="outlined" onChange={handleChange} value={textColour} size="small" />
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
            max={window.innerWidth}

            value={imageWidth}
            onChange={(event, newValue) => setImageWidth(newValue)}
            valueLabelDisplay="auto"
          />

        </div>
      </div>
      <ImageView
        width={`${imageWidth}px`}
        imageUrl={imageUrl}
        textVisible={checkForText}
        imageVisible={checkForImage}
        text={textData}
        textColour={textColour}
        handleTextClick={handleTextClick}
      />
 

        <div style={{ position: 'absolute', top: '10%', left: 0 }}>
        <Draggable handle="strong" {...{ onStart: () => '', onStop: () => '' }}
        >
          <div className="box no-cursor">
            <strong className="cursor"><div>Microstation Text</div></strong>
            <div>
              <TextField
                id="standard-multiline-static"
                label=""
                multiline
                rows={30}
                variant="outlined"
                value={textAreaValue}
                onChange={(event) => setTextAreaValue(event.target.value)}
              />
            </div>
          </div>
        </Draggable>
        </div>



    </Grid>
  );
}


export default App;

//{textAreaValue.split('\n').map((item, i) => <>{item}<br></br></>)}
//
