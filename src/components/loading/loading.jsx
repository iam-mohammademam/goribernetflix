const Loading = ({ className }) => {
  return (
    <>
      <div className={`${className} flex items-center justify-center`}>
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/offices/100/000000/spinner-frame-5.png"
          alt="spinner-frame-5"
          className="h-14 w-14 loading-icon mx-auto"
        />
      </div>
    </>
  );
};
export default Loading;
