import {Link} from 'react-router-dom';
import {faceBookUrl,youtubeUrl,twitterUrl} from '../../Clipboard/Clipboard';

export function SocilaLinks(){
    return (<>
              <Link to={faceBookUrl} className='text-decoration-none mx-1'><i className="fa-brands fa-facebook-f"></i></Link> 
              <Link to={twitterUrl} className='text-decoration-none mx-1'><i className="fa-brands fa-twitter"></i></Link>   
              <Link to={youtubeUrl} className='text-decoration-none mx-1'><i className="fa-brands fa-youtube"></i></Link>    
              <Link to={faceBookUrl} className='text-decoration-none mx-1'><i className="fa-brands fa-instagram"></i></Link> 
    </>)
}