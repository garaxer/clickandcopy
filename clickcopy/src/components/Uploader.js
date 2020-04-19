import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

import {uploadPlan} from '../api';
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

const Uploader = (props) => {

  const [response, setResponse] = useState('no')

  const dispatch = (action) => {
    console.log(action.payload)

  }

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    //acceptedFiles[0] = 'file'
    console.log(acceptedFiles[0].name)
    uploadPlan(acceptedFiles[0])(dispatch)
  }, [])
  
  const refreshClick = () => {
    window.location.reload();
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({onDrop, accept: 'image/*'});

  return (
    <div className="container">
      <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <Button color="inherit">
          <PublishIcon />
          Upload An Image
        </Button>
      </Container>

      {response==='valid'
        ? <Button onClick={() => refreshClick()} color="inherit">Upload Successful, Please Refresh</Button>
        : <></>
      }
    </div>
  );
}

export default Uploader;