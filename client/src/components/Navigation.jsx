import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();

  return (
    <Navbar dark expand="md" className="navbar-custom">
      <Nav className="mx-auto" navbar>
        <NavItem>
          <NavLink tag={Link} href="/" active={router.pathname === "/"}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={Link}
            href="/create_listing"
            active={router.pathname === "/create_listing"}
          >
            Create Listing
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={Link}
            href="/orders"
            active={router.pathname === "/orders"}
          >
            Orders
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={Link}
            href="/analytics"
            active={router.pathname === "/analytics"}
          >
            Analytics
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}
