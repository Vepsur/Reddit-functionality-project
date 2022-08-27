import { CREATE_POST } from '../mutations/posts';
import { useMutation } from "@apollo/client";
import { useState } from "react";

export default function Post() {
  const [createPost] = useMutation(CREATE_POST);
  const [postAttr, setPostAttr] = useState({
    url: '',
    description: '',
  });

  const logout = () => {
    setUserToken('');
    localStorage.setItem('token', '');
  }

  const onCreatePost = () => {
    createPost({
      variables: {
        url: postAttr.url,
        description: postAttr.description,
      }
    }).then(({ data }) => {
      console.log(data);
    })
      .catch((err) => {
        alert('Error on creating post. Check log')
        console.log(err)
      });
  }

  return (
    <div>
      <button onClick={() => logout()} className="w-40 border-black border-2 m-5 rounded-full flex flex-col items-center justify-center">Logout</button>
      <div className="w-full flex flex-col items-end justify-center">
        <div className='flex flex-col items-start justify-center'>
          <span>Link</span>
          <input
            value={postAttr.url}
            onChange={(e) => setPostAttr({ ...postAttr, url: e.target.value })}
            className="border-black pl-2 border-2 mr-2 rounded-md"
            type="text"
            placeholder="Link">
          </input>
        </div>
        <div className='flex flex-col items-start justify-center'>
          <span>Description</span>
          <input
            value={postAttr.description}
            onChange={(e) => setPostAttr({ ...postAttr, description: e.target.value })}
            className="border-black pl-2 border-2 mr-2 rounded-md"
            type="text"
            placeholder="Description">
          </input>
        </div>
      </div>
      <button onClick={() => onCreatePost()} className="w-40 border-black border-2 m-5 rounded-full flex flex-col items-center justify-center">Create Post</button>
    </div>
  )
}