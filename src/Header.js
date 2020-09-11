import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { getTotalItems } from "./reducer";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  const [{ basket, user }] = useStateValue();
  const [searchTerm, setSearchTerm] = useState("");

  const login = () => {
    if (user) {
      auth.signOut();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.length === 0) {
      history.push("/");
    } else {
      history.push({
        pathname: "/search",
        data: { searchTerm: searchTerm },
      });
    }
  };

  return (
    <nav className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon"
        />
      </Link>
      <form className="header__search">
        <input
          placeholder="Search Items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className="header__searchInput"
        />
        <Button onClick={handleSearch} type="submit">
          <SearchIcon className="header__searchIcon" />
        </Button>
      </form>

      <div className="header__nav">
        <Link to={!user && "/login"} className="header__link">
          <div onClick={login} className="header__option">
            <span className="header__optionLineOne">
              Hello {user?.email ? user?.email.split("@")[0] : "Guest"}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders" className="header__link header__hide">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <Link className="header__link header__hide">
          <div
            onClick={() => window.open("https://primevideo.com")}
            className="header__option"
          >
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>
        </Link>

        <Link to="/checkout" className="header__link">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {getTotalItems(basket)}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
