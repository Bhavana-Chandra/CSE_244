import { supabase } from '../lib/supabase'
import type { UserProgress, UserStats } from '../lib/supabase'

class ProgressService {
  async saveProgress(
    userId: string,
    scenarioId: string,
    choiceMade: string,
    isCorrect: boolean
  ): Promise<UserProgress> {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        scenario_id: scenarioId,
        choice_made: choiceMade,
        is_correct: isCorrect,
        completed: true,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async getUserProgress(userId: string): Promise<UserProgress[]> {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getUserStats(userId: string): Promise<UserStats> {
    const { data, error } = await supabase
      .from('user_progress')
      .select('scenario_id, is_correct')
      .eq('user_id', userId)
      .eq('completed', true)

    if (error) throw error

    const totalScenariosCompleted = data?.length || 0
    const totalCorrectChoices = data?.filter(item => item.is_correct).length || 0
    const scenariosCompleted = data?.map(item => item.scenario_id) || []

    return {
      total_scenarios_completed: totalScenariosCompleted,
      total_correct_choices: totalCorrectChoices,
      scenarios_completed: scenariosCompleted,
    }
  }

  async isScenarioCompleted(userId: string, scenarioId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('user_progress')
      .select('id')
      .eq('user_id', userId)
      .eq('scenario_id', scenarioId)
      .eq('completed', true)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned
    return !!data
  }

  async getCompletionRate(userId: string): Promise<number> {
    // Assuming we have 5 scenarios total
    const totalScenarios = 5
    const stats = await this.getUserStats(userId)
    return (stats.total_scenarios_completed / totalScenarios) * 100
  }
}

export const progressService = new ProgressService()
