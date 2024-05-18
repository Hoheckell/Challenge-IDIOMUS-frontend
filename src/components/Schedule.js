import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "./Schedule.module.css";
import authService from "../services/AuthService";
import LeagueService from "../services/LeagueService";

function Schedule() {
    const [matches, setMatches] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const authResponse = await authService.getAuth();
            const leagueService = new LeagueService(authResponse);
            await leagueService.fetchData();
            const matchesResponse = leagueService.getMatches();
            setMatches(matchesResponse);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };
        fetchData();
    }, []);
    return (
        <div className={styles.container}>
        <div className={styles.tablecontainer}>
            <h1>League Schedule</h1>
            <table className={styles.scheduletable}>
            <thead>
                <tr>
                <th align="left" className={styles.datetimeth}>
                    DateTime
                </th>
                <th className={styles.stadiumdata}>Stadium</th>
                <th className={styles.hometeamheader}>Home Team</th>
                <th></th>
                <th className={styles.awayteamheader}>Away Team</th>
                </tr>
            </thead>
            <tbody className={styles.scheduletbody}>
                {matches?.length > 0 &&
                matches.map((i) => (
                    <tr key={i.id}>
                    <td align="left" className={styles.datetimetd} >
                        <div className={styles.datetimetext}>
                            {moment.unix(i.matchDate).format("D.M.YYYY")}<br/>
                            {moment.unix(i.matchDate).format("hh:mm")}
                        </div>
                    </td>
                    <td className={styles.stadiumdata}>{i.stadium}</td>
                    <td>
                        <div className={styles.hometeam}>
                        {i.homeTeam}
                        <img
                            src={`https://flagsapi.codeaid.io/${i.homeTeam}.png`}
                            width={53}
                            height={37}
                            className={styles.tableimage}
                            alt={i.homeTeam}
                        />
                        </div>
                    </td>
                    <td className={styles.score}>
                        {i.homeTeamScore} : {i.awayTeamScore}
                    </td>
                    <td>
                        <div className={styles.awayteam}>
                        <img
                            src={`https://flagsapi.codeaid.io/${i.awayTeam}.png`}
                            className={styles.tableimage}
                            width={53}
                            height={37}
                            alt={i.awayTeam}
                        />
                        {i.awayTeam}
                        </div>
                    </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}

export default Schedule;
