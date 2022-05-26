import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer class="text-center bg-gray-100 text-gray-600 h-[10vh]">
      <div class="text-center p-6 bg-gray-200">
        <span>© 2021 Copyright:</span>
        <Link to="/notfound" class="text-gray-600 font-semibold">
          My Site
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
