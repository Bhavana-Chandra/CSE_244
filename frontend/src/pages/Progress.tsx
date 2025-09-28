import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { scenarios } from "./scenarioData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress as ProgressBar } from "../components/ui/progress";
import { CheckCircle, Circle, Award, Target } from "lucide-react";

interface UserProgress {
  scenario_id: string;
  choice_made: string;
  is_correct: boolean;
  completed_at: string;
}

interface UserStats {
  total_scenarios_completed: number;
  total_correct_choices: number;
  scenarios_completed: string[];
}

const Progress: React.FC = () => {
  const { user, getUserProgress, getUserStats } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProgress();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadProgress = async () => {
    try {
      const [progressData, statsData] = await Promise.all([
        getUserProgress(),
        getUserStats()
      ]);
      setProgress(progressData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCompletionRate = () => {
    if (!stats) return 0;
    return (stats.total_scenarios_completed / scenarios.length) * 100;
  };

  const getAccuracyRate = () => {
    if (!stats || stats.total_scenarios_completed === 0) return 0;
    return (stats.total_correct_choices / stats.total_scenarios_completed) * 100;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Progress Dashboard</h1>
            <p className="text-gray-600 mb-6">Please log in to view your progress</p>
            <Button asChild>
              <a href="/login">Login</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-10">
          <div className="text-center">Loading your progress...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Your Progress Dashboard</h1>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getCompletionRate().toFixed(0)}%</div>
                <ProgressBar value={getCompletionRate()} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {stats?.total_scenarios_completed || 0} of {scenarios.length} scenarios completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getAccuracyRate().toFixed(0)}%</div>
                <p className="text-xs text-muted-foreground mt-2">
                  {stats?.total_correct_choices || 0} correct answers out of {stats?.total_scenarios_completed || 0} completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Constitutional Knowledge</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getAccuracyRate() >= 80 ? "Advanced" : getAccuracyRate() >= 60 ? "Intermediate" : "Beginner"}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on your performance across scenarios
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Scenario Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Scenario Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scenarios.map((scenario) => {
                  const scenarioProgress = progress.find(p => p.scenario_id === scenario.id);
                  const isCompleted = stats?.scenarios_completed.includes(scenario.id) || false;
                  
                  return (
                    <div key={scenario.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <Circle className="h-6 w-6 text-gray-400" />
                        )}
                        <div>
                          <h3 className="font-semibold">{scenario.title}</h3>
                          <p className="text-sm text-gray-600">{scenario.theme}</p>
                          {scenarioProgress && (
                            <div className="mt-2">
                              <span className={`text-xs px-2 py-1 rounded ${
                                scenarioProgress.is_correct 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {scenarioProgress.is_correct ? 'Correct' : 'Incorrect'}
                              </span>
                              <p className="text-xs text-gray-500 mt-1">
                                Completed: {new Date(scenarioProgress.completed_at).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant={isCompleted ? "outline" : "default"}
                        asChild
                      >
                        <a href={`/scenarios/${scenario.id}`}>
                          {isCompleted ? "Review" : "Start"}
                        </a>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Progress;