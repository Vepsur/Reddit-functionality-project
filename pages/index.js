import Timeline from '../components/Timeline';
import React from "react";
import { useState } from "react";
import Upvotes from '../components/Upvotes';
import Form from '../components/Form';
import Post from '../components/Post';

export default function ClientSide() {
  const [userToken, setUserToken] = useState('');
  const [upvotesVisible, setUpvotesVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);


  React.useEffect(() => {
    upvotesVisible ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '';
  }, [upvotesVisible]);


  return (
    <div className={upvotesVisible ? 'overflow-hidden' : 'container'}>
      {!userToken ? (
        <Form setUserToken={setUserToken} />
      ) : (
        <Post />
      )
      }

      <div className='posts relative'>
        <Timeline upvotesVisible={upvotesVisible} setUpvotesVisible={setUpvotesVisible} setSelectedPost={setSelectedPost} />
        <Upvotes upvotesVisible={upvotesVisible} selectedPost={selectedPost} setUpvotesVisible={setUpvotesVisible} />
      </div>
    </div>

  )
}
