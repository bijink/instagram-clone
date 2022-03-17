import Post from "./Post";

import type { PostPropsTypes } from "../types/components/Post.types";


const posts: PostPropsTypes[] = [
   {
      id: '123',
      username: 'Bijin',
      userImg: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      caption: "laa laa laa"
   },
   {
      id: '134',
      username: 'Babu',
      userImg: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
      img: 'https://www.imagesource.com/wp-content/uploads/2019/06/Rio.jpg',
      caption: "blaa blaa blaa"
   },
];


const Posts = () => {
   return (
      <div>
         {posts.map(post => (
            <Post
               key={post.id}
               id={post.id}
               username={post.username}
               userImg={post.userImg}
               img={post.img}
               caption={post.caption}
            />
         ))}
      </div>
   );
};

export default Posts;
