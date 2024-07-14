import NavLink from "@/Components/NavLink";

const NavLinks = () =>
  <>
    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
      Dashboard
    </NavLink>
  </>;

export default NavLinks;
