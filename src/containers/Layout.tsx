import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FC } from "react";
import { useCookies } from "react-cookie";

interface ILayout {
  search: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Layout: FC<ILayout> = ({ handleSearch, search }) => {
  const [cookies, , removeCookie] = useCookies(["user_token"]);

  const handleLogout = () => {
    removeCookie("user_token");
  };

  return (
    <>
      <Header authToken={cookies.user_token} search={search} handleSearch={handleSearch} handleLogout={handleLogout} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
