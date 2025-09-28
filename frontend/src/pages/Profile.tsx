import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { User, Mail, Calendar, Trophy, Target } from "lucide-react";
import { useGame } from "../context/GameContext";

const Profile: React.FC = () => {
  const { gameState } = useGame();

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">User Profile</h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* User Info Card */}
            <Card className="constitutional-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>user@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Member since January 2024</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="w-4 h-4 text-muted-foreground" />
                  <span>Constitutional Scholar</span>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="constitutional-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Learning Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Score</span>
                  <Badge variant="secondary" className="text-lg">
                    {Object.values(gameState?.gameScores || {}).reduce((sum, game) => sum + (game?.score || 0), 0)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Games Played</span>
                  <Badge variant="outline">
                    {Object.values(gameState?.gameScores || {}).reduce((sum, game) => sum + (game?.gamesPlayed || 0), 0)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Coins Earned</span>
                  <Badge variant="outline" className="text-yellow-600">
                    {gameState?.totalCoins || 0}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Progress */}
          <Card className="constitutional-card mt-6">
            <CardHeader>
              <CardTitle>Game Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(gameState?.gameScores || {}).map(([gameId, stats]) => (
                  <div key={gameId} className="p-4 border rounded-lg">
                    <h3 className="font-semibold capitalize mb-2">
                      {gameId.replace('-', ' ')}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Score:</span>
                        <span className="font-medium">{stats.score}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Best:</span>
                        <span className="font-medium">{stats.bestScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Progress:</span>
                        <span className="font-medium">{stats.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline">Edit Profile</Button>
            <Button variant="outline">Export Data</Button>
            <Button variant="outline">Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;