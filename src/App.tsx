import React, { useEffect, useState } from 'react';
import './App.css';
import { useLocation, useNavigate } from 'react-router';
import queryString from 'query-string';
import Button from 'react-bootstrap/Button';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = queryString.parse(location.search);
  const [show, setShow] = useState(params?.show == "true" ? true : false);

  console.log('state: ', show, params)

  const unsubscribe = () => {
    fetch('http://home.local.cedcommerce.com/connector/test/testEmailUnsubscribeLink?token=' + params?.token ?? '',
      {
        method: 'GET'
      }).then((response) => {
        return response.json()
      }).then((res) => {
        navigate(`/?token=${params.token}&show=${!res.success}`)
        setShow(!res.success);
      })
  }

  useEffect(() => {

  }, [])

  return (
    <div className="align-center">
      <div>
        <div className='display banner'>
          <img src="https://i.imgur.com/y4LL72f.png" className='img'></img>
          <span>Cedcommerce Amazon Channel</span>
        </div>
        <br></br>
        <div className='display'>
          {show && <Button variant="light" onClick={() => { unsubscribe() }}>
            Unsubscribe Mail
          </Button>}
          {!show &&
            <h1 className='t-success'>Hurray! Your mail has been unsubscribed.</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
