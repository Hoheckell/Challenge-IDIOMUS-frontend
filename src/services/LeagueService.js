import axios from "axios";

/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 *
 */
class LeagueService {
    constructor(authToken) {
        this.authToken = authToken;
    }
    matches = [];
  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
    setMatches(matches) {
        this.matches = matches;
    }

    /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
    getMatches() {
        return this.matches;
    }

    /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
    getLeaderboard() {
        const teams = {};

        this.matches.forEach(match => {
            if (!teams[match.homeTeam]) {
                teams[match.homeTeam] = {
                teamName: match.homeTeam,
                points: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalDifference: 0,
                matchesPlayed: 0,
                headToHead: {}
                };
            }
            if (!teams[match.awayTeam]) {
                teams[match.awayTeam] = {
                teamName: match.awayTeam,
                points: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalDifference: 0,
                matchesPlayed: 0,
                headToHead: {}
                };
            }
            });
            
            
        this.matches.forEach(match => {
            const home = teams[match.homeTeam];
            const away = teams[match.awayTeam];
        
            home.goalsFor += match.homeTeamScore;
            home.goalsAgainst += match.awayTeamScore;
            home.goalDifference = home.goalsFor - home.goalsAgainst;
            home.matchesPlayed += match.matchPlayed ? 1 : 0;
        
            away.goalsFor += match.awayTeamScore;
            away.goalsAgainst += match.homeTeamScore;
            away.goalDifference = away.goalsFor - away.goalsAgainst;
            away.matchesPlayed += match.matchPlayed ? 1 : 0;
        
            if (match.matchPlayed) {
                if (match.homeTeamScore > match.awayTeamScore) {
                home.points += 3;
                } else if (match.homeTeamScore < match.awayTeamScore) {
                away.points += 3;
                } else {
                home.points += 1;
                away.points += 1;
                }
        
                if (!home.headToHead[match.awayTeam]) {
                home.headToHead[match.awayTeam] = { points: 0, goalsFor: 0, goalsAgainst: 0 };
                }
                if (!away.headToHead[match.homeTeam]) {
                away.headToHead[match.homeTeam] = { points: 0, goalsFor: 0, goalsAgainst: 0 };
                }
        
                if (match.homeTeamScore > match.awayTeamScore) {
                home.headToHead[match.awayTeam].points += 3;
                } else if (match.homeTeamScore < match.awayTeamScore) {
                away.headToHead[match.homeTeam].points += 3;
                } else {
                home.headToHead[match.awayTeam].points += 1;
                away.headToHead[match.homeTeam].points += 1;
                }
        
                home.headToHead[match.awayTeam].goalsFor += match.homeTeamScore;
                home.headToHead[match.awayTeam].goalsAgainst += match.awayTeamScore;
                away.headToHead[match.homeTeam].goalsFor += match.awayTeamScore;
                away.headToHead[match.homeTeam].goalsAgainst += match.homeTeamScore;
            }
        });
        
        let leaderboardArray = Object.values(teams);
        
        const createMiniLeaderboard = (teamsArray, matches) => {
            const miniTeams = {};
            teamsArray.forEach(team => {
                miniTeams[team.teamName] = { ...team, points: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0 };
            });
        
            matches.forEach(match => {
                const home = miniTeams[match.homeTeam];
                const away = miniTeams[match.awayTeam];
        
                if (home && away) {
                home.goalsFor += match.homeTeamScore;
                home.goalsAgainst += match.awayTeamScore;
                home.goalDifference = home.goalsFor - home.goalsAgainst;
        
                away.goalsFor += match.awayTeamScore;
                away.goalsAgainst += match.homeTeamScore;
                away.goalDifference = away.goalsFor - away.goalsAgainst;
        
                if (match.matchPlayed) {
                    if (match.homeTeamScore > match.awayTeamScore) {
                    home.points += 3;
                    } else if (match.homeTeamScore < match.awayTeamScore) {
                    away.points += 3;
                    } else {
                    home.points += 1;
                    away.points += 1;
                    }
                }
            }
        });
        
        return Object.values(miniTeams).sort((a, b) => {
                if (b.points !== a.points) {
                return b.points - a.points;
                }
                if (b.goalDifference !== a.goalDifference) {
                return b.goalDifference - a.goalDifference;
                }
                if (b.goalsFor !== a.goalsFor) {
                return b.goalsFor - a.goalsFor;
                }
                return a.teamName.localeCompare(b.teamName);
            });
            };
        
        const compareTeams = (a, b) => {
            if (b.points !== a.points) {
                return b.points - a.points;
            }
        
            const tiedTeams = leaderboardArray.filter(team => team.points === a.points);
            const tiedMatches = this.matches.filter(match => tiedTeams.find(t => t.teamName === match.homeTeam) && tiedTeams.find(t => t.teamName === match.awayTeam));
            const miniLeaderboard = createMiniLeaderboard(tiedTeams, tiedMatches);
        
            const miniRankA = miniLeaderboard.findIndex(team => team.teamName === a.teamName);
            const miniRankB = miniLeaderboard.findIndex(team => team.teamName === b.teamName);
        
            if (miniRankA !== miniRankB) {
                return miniRankA - miniRankB;
            }
        
            if (b.goalDifference !== a.goalDifference) {
                return b.goalDifference - a.goalDifference;
            }
            if (b.goalsFor !== a.goalsFor) {
                return b.goalsFor - a.goalsFor;
            }
            return a.teamName.localeCompare(b.teamName);
        };
        
        leaderboardArray.sort(compareTeams);
        
        return leaderboardArray;
    }

    /**
   * Asynchronic function to fetch the data from the server and set the matches.
   */
    async fetchData() {
        await axios
        .get(`${process.env.REACT_APP_API_URL_V1}/getAllMatches`, {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
            },
        })
        .then((response) => { 
            if (response.data.success) {
                this.setMatches(response.data.matches);
            }
        })
        .catch((error) => {
            console.error("Erro ao fazer requisição:", error);
        });
    }
}

export default LeagueService;
