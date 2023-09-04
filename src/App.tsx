import React, { useEffect, useState } from 'react';
import './App.css';
import { useLocation, useNavigate } from 'react-router';
import queryString from 'query-string';
import Button from 'react-bootstrap/Button';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = queryString.parse(location.search);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(params?.message ?? false);
  //const url = 'http://home.local.cedcommerce.com/connector/email/processEmailSubscription';
  const url = 'https://dev-amazon-sales-channel-app-backend.cifapps.com/connector/email/processEmailSubscription';


  const unsubscribe = () => {
    fetch(url + '?token=' + params?.token ?? '',
      {
        method: 'GET',
        headers: {
          Accept: "*",
          'Access-Control-Allow-Origin': "*"
        }
      }).then((response) => {
        return response.json()
      }).then((res) => {
        setShow(false);
        setMessage(res.message);
      })
  }

  useEffect(() => {
    fetch(url + '?token=' + (params?.token ?? '') + '&validate=true',
      {
        method: 'GET',
        headers: {
          Accept: "*",
          'Access-Control-Allow-Origin': "*"
        }
      }).then((response) => {
        return response.json()
      }).then((res) => {
        setShow(!res.already_implemented);
        setMessage(res.message);
      })
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
          </Button>
          }
          {!show &&
            <h1 className='t-success'>{message}</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
