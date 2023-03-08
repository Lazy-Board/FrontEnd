const Loading = (): JSX.Element => {
  return (
    <div className="mx-10 mt-2 flex flex-col gap-3">
      <div className="w-80 h-4 bg-gray-200 rounded-md dark:bg-gray-700"></div>
      <div className="w-80 h-4 bg-gray-200 rounded-md dark:bg-gray-700"></div>
      <div className="w-24 h-4 bg-gray-200 rounded-md dark:bg-gray-700"></div>
    </div>
  );
};

export default Loading;
