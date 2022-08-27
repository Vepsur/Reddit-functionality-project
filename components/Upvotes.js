export default function Upvotes({ upvotesVisible, selectedPost, setUpvotesVisible }) {

  return (
    <div className={upvotesVisible ? 'fixed top-0 left-0 bg-white w-full h-full' : 'hidden'}>
      <button onClick={() => setUpvotesVisible(false)} className="absolute w-16 h-max border-black border-2 m-2 rounded-full flex items-center justify-center">
        Close
      </button>
      {
        <div className="w-full h-full mr-2 ml-2 flex flex-col items-center justify-start overflow-auto">
          <p>User who upvoted '{selectedPost?.description}'</p>
          {
            selectedPost && selectedPost.votes && selectedPost.votes.map((user, index) => (
              <div className="w-60 h-max border-black border-2 m-2 rounded-full flex items-center justify-center" key={index + 'up'}>
                {user.user.name ? user.user.name : 'Anonim'}
              </div>
            ))

          }
        </div>
      }
    </div>
  );
}