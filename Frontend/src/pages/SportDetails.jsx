import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";

const sportsData = {
  Cricket: {
    icon: "🏏",
    color: "#FF6B6B",
    description: "A bat-and-ball game played between two teams of eleven players on a field at the centre of which is a 22-yard pitch.",
    rules: [
      {
        title: "Basic Rules",
        content: [
          "Each team has 11 players",
          "The game is played in innings (T20, ODI, or Test format)",
          "The batting team tries to score runs while the fielding team tries to get them out",
          "A run is scored when batsmen run between the wickets",
          "Boundaries: 4 runs for hitting the boundary, 6 runs for clearing it"
        ]
      },
      {
        title: "Ways to Get Out",
        content: [
          "Bowled: Ball hits the stumps",
          "Caught: Ball caught by fielder before hitting ground",
          "LBW: Leg Before Wicket",
          "Run Out: Wicket broken while batsman is running",
          "Stumped: Wicketkeeper removes bails while batsman is out of crease"
        ]
      },
      {
        title: "Formats",
        content: [
          "T20: 20 overs per side, ~3 hours",
          "ODI: 50 overs per side, ~8 hours",
          "Test: Unlimited overs, 5 days"
        ]
      },
      {
        title: "Equipment",
        content: [
          "Bat, Ball, Stumps, Bails",
          "Protective gear: Helmet, Pads, Gloves",
          "Fielding equipment"
        ]
      }
    ],
    formats: ["T20", "ODI", "Test Match"],
    players: 11,
    duration: "3-8 hours depending on format"
  },
  Football: {
    icon: "⚽",
    color: "#4ECDC4",
    description: "A team sport played between two teams of 11 players using a spherical ball. The objective is to score by getting the ball into the opposing goal.",
    rules: [
      {
        title: "Basic Rules",
        content: [
          "Each team has 11 players (1 goalkeeper, 10 outfield players)",
          "Match duration: 90 minutes (two 45-minute halves)",
          "The ball must be in play within the field boundaries",
          "Players cannot use hands or arms (except goalkeeper in penalty area)",
          "Offside rule applies when attacking"
        ]
      },
      {
        title: "Fouls & Cards",
        content: [
          "Yellow Card: Warning for misconduct",
          "Red Card: Ejection from game (serious foul or two yellows)",
          "Free kicks awarded for fouls",
          "Penalty kicks for fouls inside penalty area"
        ]
      },
      {
        title: "Scoring",
        content: [
          "Goal: Ball completely crosses goal line between posts",
          "Each goal counts as 1 point",
          "Winner is team with most goals at end of match",
          "Draw if scores are equal"
        ]
      },
      {
        title: "Field Dimensions",
        content: [
          "Length: 100-110 meters",
          "Width: 64-75 meters",
          "Goal area: 5.5m x 18.32m",
          "Penalty area: 16.5m x 40.32m"
        ]
      }
    ],
    formats: ["90 Minutes", "Extra Time", "Penalty Shootout"],
    players: 11,
    duration: "90 minutes + stoppage time"
  },
  Basketball: {
    icon: "🏀",
    color: "#45B7D1",
    description: "A team sport where two teams of five players try to score points by shooting a ball through a hoop elevated 10 feet above the ground.",
    rules: [
      {
        title: "Basic Rules",
        content: [
          "Each team has 5 players on court",
          "Game duration: 4 quarters of 10-12 minutes each",
          "Score by shooting ball through opponent's hoop",
          "Ball must be dribbled when moving",
          "Shot clock: 24 seconds to attempt shot"
        ]
      },
      {
        title: "Scoring",
        content: [
          "3 points: Shot from beyond 3-point line",
          "2 points: Shot from inside 3-point line",
          "1 point: Free throw"
        ]
      },
      {
        title: "Violations",
        content: [
          "Traveling: Moving without dribbling",
          "Double dribble: Dribbling with both hands or stopping and restarting",
          "Goaltending: Interfering with ball on downward path to basket",
          "3-second violation: Staying in key for more than 3 seconds"
        ]
      },
      {
        title: "Court Dimensions",
        content: [
          "Length: 28 meters (94 feet)",
          "Width: 15 meters (50 feet)",
          "Basket height: 3.05 meters (10 feet)",
          "3-point line: 6.75 meters (22.15 feet) from basket"
        ]
      }
    ],
    formats: ["4 Quarters", "Overtime", "3x3"],
    players: 5,
    duration: "40-48 minutes (game time)"
  },
  Volleyball: {
    icon: "🏐",
    color: "#FFA07A",
    description: "A team sport where two teams of six players are separated by a net. Each team tries to score points by grounding a ball on the other team's court.",
    rules: [
      {
        title: "Basic Rules",
        content: [
          "Each team has 6 players on court",
          "Match: Best of 5 sets (first to 3 sets wins)",
          "Set: First to 25 points (must win by 2)",
          "Maximum 3 touches per side before ball must cross net",
          "Players rotate positions clockwise when receiving serve"
        ]
      },
      {
        title: "Scoring",
        content: [
          "Point scored when ball lands in opponent's court",
          "Point scored when opponent commits fault",
          "Rally scoring: Point on every serve",
          "Set won by first team to 25 (must win by 2)"
        ]
      },
      {
        title: "Faults",
        content: [
          "Ball touches ground outside court",
          "More than 3 touches on one side",
          "Player touches net during play",
          "Ball held or thrown (not hit)",
          "Player crosses center line"
        ]
      },
      {
        title: "Court Dimensions",
        content: [
          "Length: 18 meters",
          "Width: 9 meters",
          "Net height: Men 2.43m, Women 2.24m",
          "Attack line: 3 meters from center line"
        ]
      }
    ],
    formats: ["Best of 5 Sets", "Beach Volleyball"],
    players: 6,
    duration: "60-90 minutes"
  },
  Chess: {
    icon: "♟️",
    color: "#98D8C8",
    description: "A strategic board game for two players played on a checkered board with 64 squares arranged in an 8×8 grid.",
    rules: [
      {
        title: "Basic Rules",
        content: [
          "Two players: White and Black",
          "White moves first",
          "Players alternate turns",
          "Object: Checkmate opponent's king",
          "Game ends in checkmate, stalemate, or draw"
        ]
      },
      {
        title: "Piece Movements",
        content: [
          "King: One square in any direction",
          "Queen: Any number of squares in any direction",
          "Rook: Any number of squares horizontally or vertically",
          "Bishop: Any number of squares diagonally",
          "Knight: L-shaped move (2 squares one way, 1 square perpendicular)",
          "Pawn: Forward one square (two on first move), captures diagonally"
        ]
      },
      {
        title: "Special Rules",
        content: [
          "Castling: King and rook move together",
          "En passant: Special pawn capture",
          "Promotion: Pawn reaching end becomes any piece",
          "Check: King is under attack",
          "Checkmate: King cannot escape check"
        ]
      },
      {
        title: "Time Controls",
        content: [
          "Classical: 90+30 minutes per player",
          "Rapid: 15+10 minutes per player",
          "Blitz: 3+2 minutes per player",
          "Bullet: 1+1 minute per player"
        ]
      }
    ],
    formats: ["Classical", "Rapid", "Blitz", "Bullet"],
    players: 2,
    duration: "Varies by time control"
  },
  Badminton: {
    icon: "🏸",
    color: "#F7DC6F",
    description: "A racquet sport played using racquets to hit a shuttlecock across a net. Can be played as singles or doubles.",
    rules: [
      {
        title: "Basic Rules",
        content: [
          "Singles: 1 player per side, Doubles: 2 players per side",
          "Match: Best of 3 games (first to 2 games wins)",
          "Game: First to 21 points (must win by 2, max 30)",
          "Serve must be underhand and below waist",
          "Shuttlecock must land in opponent's court"
        ]
      },
      {
        title: "Scoring",
        content: [
          "Point scored when opponent fails to return shuttlecock",
          "Point scored when shuttlecock lands in opponent's court",
          "Point scored when opponent commits fault",
          "Game won by first to 21 (must win by 2)"
        ]
      },
      {
        title: "Faults",
        content: [
          "Shuttlecock lands outside court",
          "Shuttlecock hits net and doesn't cross",
          "Player touches net with racquet or body",
          "Shuttlecock hit twice in succession",
          "Player reaches over net to hit shuttlecock"
        ]
      },
      {
        title: "Court Dimensions",
        content: [
          "Length: 13.4 meters",
          "Width: 6.1 meters (doubles), 5.18 meters (singles)",
          "Net height: 1.55 meters at edges, 1.524 meters at center",
          "Service area: 1.98 meters from net"
        ]
      }
    ],
    formats: ["Singles", "Doubles", "Mixed Doubles"],
    players: "1-2 per side",
    duration: "30-60 minutes"
  }
};

export default function SportDetails() {
  const { sportName } = useParams();
  const [sport, setSport] = useState(null);

  useEffect(() => {
    const sportKey = sportName?.charAt(0).toUpperCase() + sportName?.slice(1);
    if (sportsData[sportKey]) {
      setSport(sportsData[sportKey]);
    }
  }, [sportName]);

  if (!sport) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sport-details-page"
      >
        <div className="sport-not-found">
          <h2>Sport not found</h2>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sport-details-page"
      style={{ "--sport-color": sport.color }}
    >
      <div className="sport-details-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sport-details-header"
        >
          <Link to="/" className="back-button">
            ← Back to Home
          </Link>
          <div className="sport-header-content">
            <div className="sport-header-icon">{sport.icon}</div>
            <div>
              <h1>{sportName}</h1>
              <p className="sport-description">{sport.description}</p>
            </div>
          </div>
        </motion.div>

        <div className="sport-info-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="sport-info-card"
          >
            <h3>Quick Info</h3>
            <div className="info-item">
              <span className="info-label">Players:</span>
              <span className="info-value">{sport.players}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Duration:</span>
              <span className="info-value">{sport.duration}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Formats:</span>
              <span className="info-value">{sport.formats.join(", ")}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="sport-actions-card"
          >
            <h3>Get Started</h3>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                style={{ width: "100%", marginBottom: "1rem" }}
              >
                Register as Player
              </motion.button>
            </Link>
            <Link to="/team-register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary"
                style={{ width: "100%" }}
              >
                Register Team
              </motion.button>
            </Link>
            <Link to="/tournaments">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary"
                style={{ width: "100%", marginTop: "1rem" }}
              >
                View Tournaments
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="sport-rules-section"
        >
          <h2>Rules & Regulations</h2>
          <div className="rules-grid">
            {sport.rules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="rule-card"
              >
                <h3>{rule.title}</h3>
                <ul>
                  {rule.content.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}


