import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import { uploadPlan } from '../api';
import Button from '@material-ui/core/Button';

import PublishIcon from '@material-ui/icons/Publish';


const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;

  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  
  outline: none;
  transition: border .24s ease-in-out;
  :focus {
    border-color: #2196f3;
  }
  :hover {
    border-color:lightblue;
  }
`;

/** Uplods an image */
const Uploader = (props) => {

  const { parentDispatch } = props;

  const [response, setResponse] = useState('')
  const [waiting, setWaiting] = useState(false)




  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    //acceptedFiles[0] = 'file'`
    if (acceptedFiles){console.log(acceptedFiles[0].name)}
    setWaiting(true)

    const dispatch = (action) => {
      console.log(action.payload)
      if (!action.payload){
        setResponse('Error receiving response from api');
      } else if (!action.payload['data']){
          setResponse('Error receiving response from api, no data');
      } else if ('error' in action.payload) {
        setResponse('Error uploading file.' + action.payload['error']);
      } else if ('data' in action.payload) {
        setResponse('valid');
        parentDispatch(
          {
            url: action.payload['url'],
            data: action.payload['data']
          }
        )
        setWaiting(false)
      } else {
        setResponse('Error receiving response from api');
      }
    }

    try {
      uploadPlan(acceptedFiles[0])(dispatch)
    } catch (error) {
      setResponse('Error receiving response from api');
    }
    
  }, [parentDispatch])

  //const refreshClick = () => {
  //  window.location.reload();
  //}

  const {
    getRootProps,
    getInputProps,
    rejectedFiles,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: 'image/*' });

  const rejectedFilesItems = rejectedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="container">
      <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <Button color="inherit">
          <PublishIcon />
          Upload An Image
        </Button>
      </Container>

      {response && response !== 'valid' 
        ? <h3>{`Warning: ${response}`}  </h3>
        : <></>
      }
      {rejectedFiles.length ? <h4> Rejected Items</h4> : ''}
      <ul>
          {rejectedFilesItems}
      </ul>
      {waiting ? <p>Please Wait</p> : ''}
    </div>
  );
}

export default Uploader;