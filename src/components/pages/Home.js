import React, { useState, useContext } from 'react';
import firebase from '../../firebase/index';
import shortid from 'shortid';
import { Redirect } from 'react-router-dom';

import UserContext from '../../context/user/userContext';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [login, setLogin] = useState('');

  const userContext = useContext(UserContext);
  const { setUsername, setHost } = userContext;

  const handleSubmit = () => {
    setUsername(login);
    if (roomId !== '') {
      // Join a room since it already has a value
      const arrayUnion = firebase.firebase.firestore.FieldValue.arrayUnion;
      firebase.db
        .collection('rooms')
        .doc(roomId)
        .update({
          users: arrayUnion(login),
        });

      setRedirect(true);
    } else {
      // Create a room
      // generate shortid
      const id = shortid.generate();
      firebase.db
        .collection('rooms')
        .doc(id)
        .set({
          users: [login],
          created: new Date(),
        });
      setHost(true);
      setRoomId(id);
      setRedirect(true);

      // create a collection doc in firebase
      // redirect to room id
    }
  };

  if (redirect) {
    return <Redirect to={`/r/${roomId}`} />;
  }

  return (
    <div className='home-container container'>
      <h1>Join a room!</h1>
      <div className='form-group'>
        <input
          id='username'
          className='text-input'
          type='text'
          placeholder='Username'
          onChange={(e) => setLogin(e.target.value)}
          value={login}
        />
        <label className='meta' htmlFor='username'>
          The username everyone will see you as
        </label>
      </div>
      <div className='form-group'>
        <input
          id='roomId'
          className='text-input'
          onChange={(e) => setRoomId(e.target.value)}
          type='text'
          placeholder='RoomId'
          value={roomId}
        />
        <label className='meta' htmlFor='roomId'>
          Leave empty to create a room
        </label>
      </div>

      <button onClick={handleSubmit} disabled={!login} className='btn'>
        Enter
      </button>
    </div>
  );
};

export default Home;
