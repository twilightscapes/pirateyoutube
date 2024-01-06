import React from "react";
import { Link } from "gatsby";
import Menu from "../../static/data/menu.json";
import useSiteMetadata from "../hooks/SiteMetadata";

export function MenuInc() {
  const { proOptions } = useSiteMetadata();
  const { showModals } = proOptions

  const newMenu = Menu.menuItems.map((menu) => (
    <Link
      key={menu.menutitle}
      aria-label={menu.menutitle}
      to={menu.url}
      title={menu.menutitle}
      className="navbar-item"
      state={showModals ? { modal: true } : {}}
      // state={{modal: true}}
    >
      {menu.menutitle}
    </Link>
  ));

  return (
    <>
      {newMenu.map((menuItem, index) => (
        <li key={index}>{menuItem}</li>
      ))}
    </>
  );
}

export default MenuInc;
