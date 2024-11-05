import Header from "../components/Header.jsx";

function AccountPage() {
    return (
        <div>
          <div className="content-other">
            <Header></Header>
          </div>
          <ul>
            <li>
              Account Settings, Log out
            </li>
            <li>
            <a href='https://github.com/dumbmety/user-profile'>Example: https://github.com/dumbmety/user-profile</a>
            </li>
          </ul>
        </div>
      );
}

export default AccountPage;