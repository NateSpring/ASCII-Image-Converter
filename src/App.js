import './App.css';
import React, { useState } from 'react';
import { Button, Form, Card, Image, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';



function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [image, setImage] = useState();
  const ref = React.useRef();





  const onChangeFile = (e) => {
    setSelectedFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    setIsFilePicked(true);
  }

  const uploadFile = (e) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(selectedFile)

    axios
      .post("http://192.168.0.33:5000/upload", formData)
      .then((res) => {
        console.log(res);
        setIsUploading(false);
        setIsDownloadReady(true);
      })
      .catch(err => console.warn(err));
  }

  const convertFile = () => {
    axios
      .get("http://192.168.0.33:5000/download", {
        responseType: 'blob'
      })
      .then((res) => {
        setImage(URL.createObjectURL(new Blob([res.data])))
        console.log(res.data)
        setIsUploading(false)
        setIsDownloadReady(false);
      })
      .catch(err => console.warn(err));
  }
  const downloadFile = () => {
    axios
      .get("http://192.168.0.33:5000/download", {
        responseType: 'blob'
      })
      .then((res) => {
        console.log(res);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', selectedFile.name.split('.')[0] + '-ascii.png'); //or any other extension
        document.body.appendChild(link);
        link.click();

        setIsUploading(false)
        setIsDownloadReady(false);
      })
      .catch(err => console.warn(err));
  }

  const clearFile = () => {
    ref.current.value = '';

    setImage(null);
    setSelectedFile(null);
    setIsFilePicked(false);
    setIsUploading(false);
    setIsDownloadReady(false);

  }





  return (
    <div className="App">
      <header className="App-header">
      </header>

      <Container fluid='md' className='d-flex align-items-center justify-content-center'>
        <Card style={{ width: '30rem' }}>
          <Card.Body>
            <p className='h1'>ASCII Converter</p>
            {isFilePicked ? <Image className='m-2' src={image} width={'350px'} />
              : <div Style={'display: block; height:250px; margin:15px; background-color:gray;'} ></div>
            }

            <Row className="m-1">
              <Col xs={12} sm={12} md={12} lg={12} >
                <Form.Control className='mb-3' type="file" ref={ref} onChange={onChangeFile} />
              </Col>
            </Row>

            <Row xs={12} sm={4} md={4} lg={4} className="justify-content-center align-items-center">
              {isDownloadReady ?
                <>
                  <Button variant='primary' className='mx-1 my-1' onClick={convertFile}>Convert</Button>
                  <Button variant='secondary' onClick={downloadFile}>Download</Button></>

                :
                <Button variant="primary m-1" disabled={selectedFile ? '' : 'disabled'} onClick={uploadFile}>{isUploading ? 'Loading...' : 'Upload'}</Button>
              }
              <Button variant="danger m-1" onClick={clearFile}>Clear</Button>
            </Row>

          </Card.Body>
        </Card>
      </Container>


    </div>
  );
}

export default App;
