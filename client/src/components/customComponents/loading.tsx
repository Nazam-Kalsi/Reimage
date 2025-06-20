function Loading() {
  return (
    <div className="absolute bg-black/50 h-full w-full flex flex-col justify-center items-center z-50">
      <div className="flex justify-center items-center gap-1">
        <div className="loader border-r-2 rounded-full border-yellow-500 bg-gradient-to-tr from-yellow-200 to-yellow-500 animate-bounce aspect-square w-4  flex justify-center items-center text-yellow-700"></div>
        <div className="loader border-r-2 rounded-full border-yellow-500 bg-gradient-to-tr from-yellow-200 to-yellow-500 animate-bounce  [animation-delay:-.3s] aspect-square w-4  flex justify-center items-center text-yellow-700"></div>
        <div className="loader border-r-2 rounded-full border-yellow-500 bg-gradient-to-tr from-yellow-200 to-yellow-500 animate-bounce [animation-delay:-.5s] aspect-square w-4  flex justify-center items-center text-yellow-700"></div>
      </div>
    </div>
  );
}

export default Loading;
