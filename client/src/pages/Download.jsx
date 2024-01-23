import {useState} from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';

const hostURL = import.meta.env.VITE_HOST_URL || 'http://localhost:8000';

export default function Download() {
  const location = useLocation();
  const navigate = useNavigate();
  const [url, setUrl] = useState('');

  const isSingleAAC = location.pathname === '/download/singleAAC';

  const handleInputChange = (event) => {
    setUrl(event.target.value);
    navigate(
      `${location.pathname}?url=${encodeURIComponent(event.target.value)}`
    );
  };

  const handleDownload = () => {
    console.log(`Downloading from URL: ${url}`);
    window.location.href = `${hostURL}${
      location.pathname
    }?url=${encodeURIComponent(url)}`;
  };

  return (
    <Container className="p-5 text-center">
      <h1>Download {isSingleAAC ? 'Song' : 'Playlist'}</h1>
      <Form>
        <Form.Group controlId="url">
          <Form.Label>Paste a URL</Form.Label>
          <Form.Control type="text" value={url} onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary mt-3" onClick={handleDownload}>
          Download {isSingleAAC ? 'Song' : 'Playlist'}
        </Button>
      </Form>
    </Container>
  );
}
