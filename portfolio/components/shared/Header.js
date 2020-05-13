import React, { useState } from "react";
import Link from "next/link";
//import { Link as RoutesLink } from "../../routes";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
  Container,
} from "reactstrap";

const BsLinkClass = ({ route, title }) => {
  return (
    <Link href={route}>
      <a className="nav-link"> {title}</a>
    </Link>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="header">
      <Navbar
        className="nav absolute"
        fixed="top"
        color="transparent"
        dark
        expand="md"
      >
        <NavbarBrand className="nav-brand" href="/">
          Daria Iakimova
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <BsLinkClass route="/" title="Home" />
            </NavItem>

            <NavItem>
              <BsLinkClass route="/about" title="About" />
            </NavItem>

            <NavItem>
              <BsLinkClass route="/portfolios" title="Portfolios" />
            </NavItem>

            <NavItem>
              <BsLinkClass route="/blogs" title="Blogs" />
            </NavItem>

            <NavItem>
              <BsLinkClass route="/cv" title="CV" />
            </NavItem>
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

{
  /* <Link href="/">
    <a>Home</a>
</Link><br/>
<Link href="/about">
    <a>About</a>
</Link><br/>
<Link href="/portfolios">
    <a>Portfolios</a>
</Link><br/>
<Link href="/blogs">
    <a>Blogs</a>
</Link><br/>
<Link href="/cv">
    <a>CV</a>
</Link><br/>
<RoutesLink route="/test/1"><a>1</a></RoutesLink><br/>
<RoutesLink route='test' params={{id: 2}}><a>2</a></RoutesLink> */
}
