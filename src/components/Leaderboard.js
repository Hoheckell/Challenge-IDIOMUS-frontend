import React, { useEffect, useState } from "react";
import authService from "../services/AuthService";
import LeagueService from "../services/LeagueService"; 
import styles from "./Leaderboard.module.css";

function Leaderboard() {
    const [matches, setMatches] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    useEffect(() => {    
    const fetchData = async () => {
        try {
            const authResponse = await authService.getAuth();
            const leagueService = new LeagueService(authResponse);
            await leagueService.fetchData()
            const matchesResponse = leagueService.getMatches();
            setMatches(matchesResponse);
            if (matchesResponse) { 
                const calculatedLeaderboard = leagueService.getLeaderboard()
                setLeaderboard(calculatedLeaderboard);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };  
        fetchData(); 
    }, []);
    return (
    <div className={styles.lbcontainer}>
        <div className={styles.lbtablecontainer}>
            <h1>Leaderboard Page</h1>
            <table className={styles.leaderboardtable}>
                <thead>
                <tr>
                    <th className={`${styles.toleftColumn} ${styles.teamnameth}`}>Team Name</th>
                    <th className={styles.centerColumn}>MP</th>
                    <th className={styles.goalsForColumn}>GF</th>
                    <th className={styles.goalsAgainstColumn}>GA</th>
                    <th className={styles.goalDiferenceColumn}>GD</th>
                    <th className={styles.centerColumn}>Points</th>
                </tr>
                </thead>
                <tbody>
                {leaderboard?.length > 0 &&
                leaderboard.map((i) => (
                    <tr>
                        <td>
                            <div className={styles.teamcolumn}>
                        <img
                        src={`https://flagsapi.codeaid.io/${i.teamName}.png`}
                        width={53}
                        height={37}
                        className={styles.tableimage}
                        alt={i.homeTeam}
                        /> {i.teamName}
                        </div>
                        </td>
                            <td className={styles.centerColumn}>{i.matchesPlayed}</td>
                            <td className={styles.goalsForColumn}>{i.goalsFor}</td>
                            <td className={styles.goalsAgainstColumn}>{i.goalsAgainst}</td>
                            <td className={styles.goalDiferenceColumn}>{i.goalDifference}</td>
                            <td className={styles.pointsColumn}>{i.points}</td>
                        </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default Leaderboard;