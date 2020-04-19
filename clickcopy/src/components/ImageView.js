import React, { useState } from 'react';

/**
 * Takes in an image and a list of text with their coordinates and displays the text on top of the image
 * @param {*} props props.width
 */
const ImageView = (props) => {
  //
  //<img style={{visibility: 'hidden'}} src="SP229975_0.jpg" />
  const { width, text, imageUrl, textVisible, imageVisible, textColour } = { textColour: 'tomato', textVisible: true, imageVisible: true, ...props };
  const [originalImageWidth, setOriginalImageWidth] = useState(0)
  const [newWidth, setNewWidth] = useState(0)


  const onTextClick = (e) => {
    console.log(e)
  }

  /** Style of the text to be displayed by overlayText */
  const textStyle = (x, y) => {
    return {
      color: textColour,
      position: 'absolute',
      top: y,
      left: x,
      margin: 0,
      fontSize: '10px',
      fontStyle: 'italic',
      //fontWeight: 'bold',
      'WebkitTextStrokeWidth': '0.7px',
      'WebkitTextStrokeColor': textColour,
      visibility: textVisible ? 'visible' : 'hidden'
    }
  }

  /**
   * scale coordinates
   * @param {x} object, x,y,scale {int,int,float}: coordinates to scale
   * @returns {x,y} where x and y have been * by scale
   */
  const scaleCoordinates = ({ x, y, scale }) => {
    // The image will be rescaled to fit the view,
    // we will figure out the how much it rescaled and
    // perform the same scale to the coordinates.
    x = x * scale;
    y = y * scale;
    return { x, y }
  }

  /** Overalyed text on relative positioned parent */
  const overlayText = (words) => {

    // Remove 1 character things
    const wordFilter = x => x['text'].length > 1 || x['text'].match(/[a-z0-9A-Z.]/i);

    // For each text make a component with its x an y as its position
    return words.filter(wordFilter).map((text, i) => {
      const word = text['text'];
      // Find how much the image was scaled by and get the new scaled Coordinates
      const imageScaleFactor = newWidth / originalImageWidth;
      const { x, y } = scaleCoordinates({
        x: text['bounds'][0]['x'],
        y: text['bounds'][0]['y'],
        scale: imageScaleFactor
      });

      //sanity check // <h3 style={textStyle(0,0)}>{testf}</h3>
      return <span key={i} onClick={onTextClick} style={textStyle(x, y)}>{word}</span>
    })
  }

  /** Gets called when the image is loaded onto the screen and places its width into state */
  const handleSize = (image) => {
    if (image) {
      setOriginalImageWidth(image.naturalWidth)
      setNewWidth(image.width)
    }
  }

  return (
    <div style={divStyle(imageVisible, imageUrl)}>
      <img style={imgStyle(width)} src={imageUrl} alt="plan"
        ref={image => {
          handleSize(image);
        }}
      />
      {originalImageWidth && overlayText(text)}
      <h3 style={h2Style} >test</h3>
    </div>
  )
}

// TODO(gary): make global css into styled components 
const imgStyle = (width, imageUrl) => ({
  visibility: 'hidden',
  pointerEvents: 'none',
  width: width
})

const divStyle = (imageVisible, imageUrl) => {
  return {
    visibility: imageVisible,
    position: 'relative',
    backgroundImage: imageVisible ? `url(${imageUrl})` : 'none',
    backgroundSize: 'contain'
    /*backgroundImage: 'url(' + imgUrl + ')',*/
  }
}

const h2Style = {
  color: 'tomato',
  position: 'absolute',
  top: '200px',
  left: '0',
  width: '100%'
}

export default ImageView;
