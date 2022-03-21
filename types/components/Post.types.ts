export interface PropsTypes {
   id: string;
   username: string;
   userImg: string;
   img: string;
   caption: string;
}

export interface CommentsComment {
   id: string;
   data: () => {
      comment: string;
      timestamp: {
         nanoseconds: number;
         seconds: number;
         toDate: () => any;
      };
      userImage: string;
      username: string;
   };
}
