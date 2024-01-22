import {Button, Container} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const navigateToSingleAcc = () => {
    navigate('/download/singleAcc');
  };

  const navigateToPlaylistAcc = () => {
    navigate('/download/playlistAcc');
  };

  return (
    <div>
      <Container fluid className="p-3 text-center">
        <h1>Download Acc Music</h1>
        <p>Here you can download music and playlist of youtube in Acc format</p>
      </Container>
      <Container className="p-5 text-center">
        <h2>Let&apos;s Download</h2>
        <Button
          variant="secondary"
          size="lg"
          className="w-100"
          style={{maxWidth: '40rem'}}
          onClick={navigateToSingleAcc}>
          Song
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="w-100 mt-3"
          style={{maxWidth: '40rem'}}
          onClick={navigateToPlaylistAcc}>
          Playlist
        </Button>
      </Container>
    </div>
  );
}
