import React, { useEffect, useState, useContext } from 'react';
import firebase from '../../firebase/index';
import UserContext from '../../context/user/userContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import YouTube from 'react-youtube';
import Members from '../layout/Members';
import VideoQueue from '../layout/VideoQueue';

const Room = ({ match }) => {
  const userContext = useContext(UserContext);
  const { isHost, username } = userContext;

  const [roomState, setRoomState] = useState({
    users: [],
    queue: [],
    videoId: '',
  });

  // const roomRef = useRef(null);

  const [url, setUrl] = useState('');

  const roomId = match.params.id;

  useEffect(() => {
    // window.addEventListener('beforeunload', unload);
    //listen for realtime changes to the room
    firebase.db
      .collection('rooms')
      .doc(roomId)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const docRef = snapshot.data();
          if (docRef.queue === undefined || docRef.queue.length === 0) {
            // The queue is empty
            setRoomState({
              ...roomState,
              users: docRef.users,
              queue: docRef.queue,
              videoId: '',
            });
          } else {
            // The queue has value
            setRoomState({
              ...roomState,
              users: docRef.users,
              queue: docRef.queue,
              videoId: docRef.queue[0],
            });
          }
        } else {
          console.log('No such document!');
        }
      });

    // eslint-disable-next-line
  }, []);

  const opts = {
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  // Util func parse the video id out of the yt url
  const parseVideoId = () => {
    let videoId = url.split('v=')[1];
    let ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    return videoId;
  };

  // parse the video id from the url, add the id to firebase queue array
  const addToQueue = (e) => {
    e.preventDefault();

    // Parse the url and and the video id to queue
    const id = parseVideoId();
    setUrl('');

    // Add the video to firebase queue
    const arrayUnion = firebase.firebase.firestore.FieldValue.arrayUnion;
    firebase.db
      .collection('rooms')
      .doc(roomId)
      .update({
        queue: arrayUnion(id),
      });
  };

  // Remove the currently playing element in the queue
  const removeFromQueue = () => {
    console.log('ended');
    const arrayRemove = firebase.firebase.firestore.FieldValue.arrayRemove;
    firebase.db
      .collection('rooms')
      .doc(roomId)
      .update({
        queue: arrayRemove(roomState.queue[0]),
      });
  };

  // const beforeClosing = () => {
  //   // const index = roomState.users.findIndex(username);
  //   // const arrayRemove = firebase.firebase.firestore.FieldValue.arrayRemove;
  //   // setTimeout(() => {
  //   //   firebase.db
  //   //     .collection('rooms')
  //   //     .doc(roomId)
  //   //     .update({
  //   //       users: arrayRemove(roomState.users[index]),
  //   //     });
  //   // }, 3000);
  // };

  // window.addEventListener('beforeunload', (event) => {
  //   event.preventDefault();
  //   event.returnValue = '';
  //   const index = roomState.users.findIndex(username);
  //   const arrayRemove = firebase.firebase.firestore.FieldValue.arrayRemove;
  //   console.log(index);
  //   alert(index);

  //   firebase.db
  //     .collection('rooms')
  //     .doc(roomId)
  //     .update({
  //       users: arrayRemove(roomState.users[index]),
  //     });
  // });

  // window.addEventListener('unload', (event) => {
  //   event.preventDefault();
  //   event.returnValue = '';
  //   const index = roomState.users.findIndex(username);
  //   const arrayRemove = firebase.firebase.firestore.FieldValue.arrayRemove;
  //   console.log(index);
  //   alert(index);
  //   firebase.db
  //     .collection('rooms')
  //     .doc(roomId)
  //     .update({
  //       users: arrayRemove(roomState.users[index]),
  //     });
  // });

  // window.addEventListener('unload', (event) => {
  //   alert('bye ');
  // });

  // const copyToClipboard = (e) => {
  //   roomRef.current.focus();
  //   document.execCommand('copy');

  //   e.target.focus();
  //   console.log('copied');
  // };

  console.log(username);

  return (
    <div className='room-container container'>
      <h1>Current Host: {roomState.users[0]}</h1>
      <div>
        Room Code: <span style={{ fontWeight: '800' }}>{roomId}</span>{' '}
        <CopyToClipboard text={roomId}>
          <button className='btn'>Copy</button>
        </CopyToClipboard>
      </div>

      <form onSubmit={addToQueue} className='url-container'>
        <input
          id='url'
          className='url-input'
          type='text'
          placeholder='Enter YouTube url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type='submit' className='btn queue-btn'>
          Add to queue
        </button>
      </form>
      <div className='queue-details'>
        {!Array.isArray(roomState.queue) || !roomState.queue.length ? (
          <div className='vid empty-queue'>Add urls to queue</div>
        ) : (
          <div className='video-container vid'>
            <YouTube
              videoId={roomState.queue[0]}
              opts={opts}
              onEnd={removeFromQueue}
            />
            {isHost && (
              <div className='video-controls'>
                <button onClick={removeFromQueue} className='btn'>
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        <VideoQueue queue={roomState.queue} />
      </div>
      <Members roomId={roomId} users={roomState.users} />
    </div>
  );
};

export default Room;
