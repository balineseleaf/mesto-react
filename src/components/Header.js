import logo from "../images/logo.svg";

export function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип страницы" />
    </header>
  );
}

export default Header;
