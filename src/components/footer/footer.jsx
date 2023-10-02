import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="w-full px-10 pt-7 pb-3 flex flex-col items-center justify-center text-center shadow">
        <div className="flex items-center mb-5 gap-3">
          <Link to="https://www.facebook.com/1.am.n0thing">
            <i className="uil uil-facebook-f text-md text-color category"></i>
          </Link>
          <Link to="https://www.github.com/iamnothing">
            <i className="uil uil-github text-md text-color category"></i>
          </Link>
          <Link to="https://www.instagram.com/1.am.n0thing">
            <i className="uil uil-instagram text-md text-color category"></i>
          </Link>
        </div>
        <div className="flex w-2/2 items-center gap-3 text-center">
          <small className=" cursor-pointer category">about</small>
          <small className="cursor-pointer category">privacy policy</small>
          <small className="cursor-pointer category">terms of use</small>
          <small className="cursor-pointer category">data safety</small>
        </div>
      </div>
    </>
  );
};
export default Footer;
