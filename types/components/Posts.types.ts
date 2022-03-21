export interface PostsPost {
   id: string;
   data: () => {
      caption: string;
      image: string;
      profileImg: string;
      timestamp: {
         nanoseconds: number;
         seconds: number;
      };
      username: string;
   };
};
