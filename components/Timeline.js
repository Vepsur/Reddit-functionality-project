import { GET_ALL_FEED, PAGINATION_FEED_QUERY } from "../query/Feed";
import { useQuery } from "@apollo/client";
import { InView } from "react-intersection-observer";

export default function Timeline({ setUpvotesVisible, setSelectedPost }) {
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_FEED, {
    variables: { take: 10, skip: 0 },
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const showUpvotes = (post) => {
    setUpvotesVisible(true);
    setSelectedPost(post);
  }

  console.log(data);

  return (
    <div className="flex flex-col items-center justify-center">
      {data &&
        data.feed.links.map((post, index) => (
          <div className="max-w-screen-md w-max border-black border-2 m-5 rounded-full flex flex-col items-center justify-center" key={index + post.description}>
            <a href={'https://' + post.url} target="_blank" className="break-all">{post.description}</a>
            <div className="w-full m-2 flex items-end justify-center">
              <button className="text-6xl pl-5">&#8679;</button>
              <div onClick={() => showUpvotes(post)} className="cursor-pointer w-max mr-2 ml-2 flex items-center justify-center">
                {
                  post.votes && post.votes.map((user, index) => {
                    if (index < 3 && user.user) return (
                      <div className="w-8 h-8 border-black border-2 rounded-full flex items-center justify-center" key={index + user.user.name}>
                        {user.user.name[0] ? user.user.name[0].toUpperCase() : 'A'}
                      </div>
                    );
                  })
                }
                <p className="pr-5">...{post.votes.length > 3 ? post.votes.length - 3 : ''} more upvotes</p>
              </div>

            </div>
          </div>
        ))}
      {data && (
        <InView
          onChange={async (inView) => {
            const currentLength = data.feed.links.length || 0;
            if (inView) {
              const {data} = await fetchMore({
                variables: {
                  take: 10,
                  skip: currentLength - 10,
                },
              });
              console.log(data);
            }
          }}
        />
      )}
    </div>
  );
}

