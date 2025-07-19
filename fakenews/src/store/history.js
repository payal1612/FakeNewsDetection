import { create } from 'zustand';

export const useHistoryStore = create(
  (set, get) => ({
      analyses: [],
      
      addAnalysis: (analysis) => {
        const newAnalysis = {
          ...analysis,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
        };
        
        set((state) => ({
          analyses: [newAnalysis, ...state.analyses].slice(0, 100) // Keep only last 100
        }));
      },
      
      removeAnalysis: (id) => {
        set((state) => ({
          analyses: state.analyses.filter(analysis => analysis.id !== id)
        }));
      },
      
      clearHistory: () => {
        set({ analyses: [] });
      },
      
      getAnalysisById: (id) => {
        return get().analyses.find(analysis => analysis.id === id);
      },
      
      getStats: () => {
        const analyses = get().analyses;
        const total = analyses.length;
        const credible = analyses.filter(a => a.credibilityScore >= 70).length;
        const questionable = analyses.filter(a => a.credibilityScore >= 40 && a.credibilityScore < 70).length;
        const unreliable = analyses.filter(a => a.credibilityScore < 40).length;
        
        return {
          total,
          credible,
          questionable,
          unreliable,
          averageScore: total > 0 ? Math.round(analyses.reduce((sum, a) => sum + a.credibilityScore, 0) / total) : 0
        };
      }
    })
);