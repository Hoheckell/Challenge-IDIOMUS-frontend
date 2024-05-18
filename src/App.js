import { Link, Route, Switch } from "react-router-dom";
import Schedule from "./components/Schedule";
import Leaderboard from "./components/Leaderboard";
import NotFound from "./components/NotFound";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <nav className={styles.navigation}>
        <div >
          <Link to="/">
            <img src={`${process.env.PUBLIC_URL}/Images/logo.svg`} alt="Logo" className={styles.logo} />
          </Link>
        </div>
        <div>
          <Link to="/schedule" className={styles.menulink}>
            <img
              src={`${process.env.PUBLIC_URL}/Images/schedule.png`}
              alt="Icon 1" className={styles.menuimg}
            />
            Schedule
          </Link>
          <Link to="/leaderboard" className={styles.menulink}>
            <img
              src={`${process.env.PUBLIC_URL}/Images/leaderboard.png`}
              alt="Icon 1" className={styles.menuimg}
            />
            Leaderboard
          </Link>
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={Schedule} />
        <Route exact path="/schedule" component={Schedule} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
