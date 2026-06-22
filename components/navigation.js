import React from "react";
import { useRouter } from "next/router";
import routes from "../constants/routes";
const Navigation = (props) => {
  const router = useRouter();
  const [navBar, setNavBar] = React.useState(false);
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    window.addEventListener("resize", handleNavBar);
    return () => {
      window.removeEventListener("scroll", changeBackground);
      window.removeEventListener("resize", handleNavBar);
      // unmount the componnet
      null;
    };
  }, []);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };
  const handleNavBar = () => {
    if (screen.width >= 950) {
      if (navbarOpen) setNavbarOpen(false);
    }
  };

  let navList = [
    {
      name: "Home",
      route: routes.home,
      classes: `nav-item ${router.pathname === "/" && "active"}`,
    },
    {
      name: "About Us",
      route: routes.aboutUs,
      classes: `nav-item ${router.pathname === "/aboutUs" && "active"}`,
    },
    // {
    //   name: "Help Center",
    //   route: routes.helpCenter,
    //   classes: `nav-item ${router.pathname === "/helpCenter" && "active"}`,
    // },
    {
      name: "Terminal Board",
      route: routes.terminalBoard,
      classes: `nav-item ${
        router.pathname === "/state/terminalboard"  && "active"
      } screenActive`,
    },
    {
      name: "App Store",
      route: props?.disabled ? null : routes.appStore,
      classes: `nav-item ${router.pathname === "/appStore" && "active"}`,
    },
  ];

  let navbarTogglerClass = `collapse navbar-collapse  justify-content-end ${navbarOpen && "show"
    }`;

  const onNavLinkClick = (item, index) => {
    router.push(item.route);
  };

  return (
    <header
      className={`fixed-top clearHeader header-view ${navBar && "sticky"} `}
    >
      <div className="container-fluid adjust">
        <nav className="navbar navbar-expand-lg">
          <a
            className="navbar-brand"
            href={props?.disabled ? null : routes.home}
          >
            <img src="/images/logo.png" className="imgLog" />
          </a>
          {!props.hideButton && (
            <>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
                aria-expanded={navbarOpen}
                onClick={() =>
                  props?.disabled ? null : setNavbarOpen(!navbarOpen)
                }
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className={navbarTogglerClass} id="collapsibleNavbar">
                <ul className="navbar-nav">
                  {navList.map((item, index) => {
                    return (
                      <li key={index} className={item.classes}>
                        {index == 4 ? (
                          <a
                            id="link"
                            className="nav-link pointer"
                            target="blank"
                            href={item.route}
                          >
                            <p className={index == 3 ? "BLUE" : ""}>
                              {item.name}
                            </p>
                          </a>
                        ) : (
                          <a
                            id="link"
                            className="nav-link pointer"
                            target="blank"
                            onClick={() => {
                              props?.disabled
                                ? null
                                : onNavLinkClick(item, index);
                            }}
                          >
                            <p className={index == 3 ? "BLUE" : ""}>
                              {item.name}
                            </p>
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
