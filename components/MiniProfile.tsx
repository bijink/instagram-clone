
const MiniProfile = () => {
   return (
      <div className="flex items-center justify-between mt-14 ml-10" >
         <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"
            alt=""
            className="w-16 h-16 rounded-full border p-[2px] "
         />
         <div className="flex-1 mx-4">
            <h2 className="font-bold" >Bijin</h2>
            <h3 className="text-sm text-gray-400" >Welcome to Imstagram</h3>
         </div>
         <button className="text-blue-400 text-sm font-semibold">Sign Out</button>
      </div>
   );
};

export default MiniProfile;
