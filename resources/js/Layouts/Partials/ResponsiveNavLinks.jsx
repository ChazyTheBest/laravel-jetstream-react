import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

const ResponsiveNavLinks = () =>
  <>
    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
      Dashboard
    </ResponsiveNavLink>
  </>;

export default ResponsiveNavLinks;
