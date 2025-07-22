import React, { useState, useCallback } from 'react';
import { Download, Share2, Bookmark, BarChart3, Save, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SimulationResult {
  [key: string]: string | number;
}

interface Scenario {
  title: string;
  description: string;
  icon: string;
  category: string;
  inputLabel: string;
  inputType: 'number' | 'select';
  inputProps?: any;
  calculate: (input: number | string) => SimulationResult;
}

const WhatIfSimulator = () => {
  const { toast } = useToast();
  const [activeScenario, setActiveScenario] = useState('bitcoin');
  const [inputValues, setInputValues] = useState<Record<string, number>>({
    bitcoin: 1000,
    sleep: 1,
    walking: 5000,
    savings: 500,
    reading: 20,
    coding: 10,
    meditation: 15,
    coffee: 5,
    tesla: 1000,
    sidehustle: 20,
    water: 3,
    smoking: 1,
    gym: 4,
    nutrition: 50,
    screentime: 2,
    routine: 30,
    automation: 2,
    deepwork: 4,
    timeblocking: 8,
    skills: 1,
    learning: 15,
    networking: 2,
    brand: 1,
    certs: 1,
    remote: 100,
    degrees: 1,
    courses: 1,
    languages: 15,
    relocation: 500,
    mealprep: 2,
    minimalism: 10,
    family: 30,
    social: 2,
    volunteering: 4,
    transport: 20,
    trees: 2,
    blog: 1,
    youtube: 1
  });
  
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedScenarios, setSavedScenarios] = useState<string[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonScenarios, setComparisonScenarios] = useState<string[]>([]);

  const categories = {
    all: { name: 'ALL_SCENARIOS', icon: '⚡', color: 'cyber-magenta' },
    finance: { name: 'FINANCE', icon: '₿', color: 'cyber-yellow' },
    health: { name: 'HEALTH', icon: '♦', color: 'cyber-red' },
    productivity: { name: 'PRODUCTIVITY', icon: '◈', color: 'cyber-green' },
    career: { name: 'CAREER', icon: '◉', color: 'cyber-cyan' },
    education: { name: 'EDUCATION', icon: '◊', color: 'cyber-magenta' },
    lifestyle: { name: 'LIFESTYLE', icon: '⟐', color: 'cyber-orange' },
    relationships: { name: 'RELATIONSHIPS', icon: '♥', color: 'cyber-red' },
    environment: { name: 'ENVIRONMENT', icon: '🌍', color: 'cyber-green' },
    technology: { name: 'TECHNOLOGY', icon: '⚡', color: 'cyber-cyan' }
  };

  const scenarios: Record<string, Scenario> = {
    // Finance (8)
    bitcoin: {
      title: 'BITCOIN_INVESTMENT',
      description: 'SIMULATE: Bitcoin investment from 2012 → 2024',
      icon: '₿',
      category: 'finance',
      inputLabel: 'INVESTMENT_AMOUNT ($)',
      inputType: 'number',
      inputProps: { min: 1, placeholder: '1000' },
      calculate: (amount: number) => {
        const bitcoinPrice2012 = 200;
        const bitcoinPrice2024 = 45000;
        const bitcoins = amount / bitcoinPrice2012;
        const currentValue = bitcoins * bitcoinPrice2024;
        return {
          investment: `$${amount.toLocaleString()}`,
          bitcoins: bitcoins.toFixed(4),
          currentValue: `$${currentValue.toLocaleString()}`,
          profit: `$${(currentValue - amount).toLocaleString()}`,
          multiplier: `${(currentValue / amount).toFixed(1)}x`,
          aiSuggestion: 'RECOMMENDATION: Dollar-cost averaging >> minimize risk'
        };
      }
    },
    tesla: {
      title: 'TESLA_STOCK',
      description: 'ANALYZE: Tesla stock investment 2010 → 2024',
      icon: '🚗',
      category: 'finance',
      inputLabel: 'INVESTMENT_AMOUNT ($)',
      inputType: 'number',
      inputProps: { min: 1, placeholder: '1000' },
      calculate: (amount: number) => {
        const teslaPrice2010 = 5; // Split-adjusted
        const teslaPrice2024 = 250;
        const shares = amount / teslaPrice2010;
        const currentValue = shares * teslaPrice2024;
        return {
          investment: `$${amount.toLocaleString()}`,
          shares: shares.toFixed(2),
          currentValue: `$${currentValue.toLocaleString()}`,
          profit: `$${(currentValue - amount).toLocaleString()}`,
          multiplier: `${(currentValue / amount).toFixed(1)}x`,
          aiSuggestion: 'STRATEGY: Focus on disruptive innovation companies'
        };
      }
    },
    coffee: {
      title: 'COFFEE_SAVINGS',
      description: 'CALCULATE: Daily coffee cost over 10 years',
      icon: '☕',
      category: 'finance',
      inputLabel: 'DAILY_COFFEE_COST ($)',
      inputType: 'number',
      inputProps: { min: 1, placeholder: '5', step: 0.5 },
      calculate: (dailyCost: number) => {
        const yearlyCost = dailyCost * 365;
        const tenYearCost = yearlyCost * 10;
        const investedValue = tenYearCost * 1.5; // 7% annual return
        return {
          dailyCost: `$${dailyCost}`,
          yearlyCost: `$${yearlyCost.toLocaleString()}`,
          tenYearCost: `$${tenYearCost.toLocaleString()}`,
          ifInvested: `$${investedValue.toLocaleString()}`,
          opportunity: `$${(investedValue - tenYearCost).toLocaleString()}`,
          aiSuggestion: 'ALTERNATIVE: Home brewing saves 70% >> invest difference'
        };
      }
    },
    sidehustle: {
      title: 'SIDE_HUSTLE',
      description: 'PROJECT: Side hustle income potential',
      icon: '💰',
      category: 'finance',
      inputLabel: 'HOURS_PER_MONTH',
      inputType: 'number',
      inputProps: { min: 1, placeholder: '20' },
      calculate: (hours: number) => {
        const hourlyRate = 25; // Average side hustle rate
        const monthlyIncome = hours * hourlyRate;
        const yearlyIncome = monthlyIncome * 12;
        const fiveYearTotal = yearlyIncome * 5;
        return {
          hoursPerMonth: hours,
          monthlyIncome: `$${monthlyIncome.toLocaleString()}`,
          yearlyIncome: `$${yearlyIncome.toLocaleString()}`,
          fiveYearTotal: `$${fiveYearTotal.toLocaleString()}`,
          skillsGained: `${Math.floor(hours / 10)} NEW_SKILLS`,
          aiSuggestion: 'OPTIMIZE: Focus on high-value skills >> increase rate'
        };
      }
    },
    savings: {
      title: 'WEALTH_ACCUMULATION',
      description: 'PROJECT: Monthly savings compound growth',
      icon: '🏦',
      category: 'finance',
      inputLabel: 'MONTHLY_SAVINGS ($)',
      inputType: 'number',
      inputProps: { min: 100, placeholder: '500', step: 100 },
      calculate: (amount: number) => {
        const months = 60;
        const totalSaved = amount * months;
        const interestRate = 0.07;
        const compoundValue = totalSaved * Math.pow(1 + interestRate / 12, months);
        return {
          monthlySavings: `$${amount.toLocaleString()}`,
          totalSaved: `$${totalSaved.toLocaleString()}`,
          compoundValue: `$${compoundValue.toFixed(0)}`,
          interestEarned: `$${(compoundValue - totalSaved).toFixed(0)}`,
          emergencyFund: `${(totalSaved / (amount * 6)).toFixed(1)} MONTHS`,
          aiSuggestion: 'AUTOMATE: Set recurring transfers >> remove friction'
        };
      }
    },

    // Health (8)
    sleep: {
      title: 'SLEEP_OPTIMIZATION',
      description: 'CALCULATE: Extra sleep impact on performance',
      icon: '😴',
      category: 'health',
      inputLabel: 'EXTRA_SLEEP_HOURS/DAY',
      inputType: 'number',
      inputProps: { min: 0.5, max: 3, step: 0.5, placeholder: '1' },
      calculate: (hours: number) => {
        const extraHoursPerYear = hours * 365;
        const productivityBoost = hours * 0.15;
        const healthBenefit = hours * 0.1;
        return {
          extraHours: hours,
          yearlyHours: extraHoursPerYear,
          productivityIncrease: `${(productivityBoost * 100).toFixed(1)}%`,
          healthImprovement: `${(healthBenefit * 100).toFixed(1)}%`,
          lifeExpectancy: `+${(hours * 0.5).toFixed(1)} YEARS`,
          aiSuggestion: 'PROTOCOL: Consistent bedtime >> optimize circadian rhythm'
        };
      }
    },
    walking: {
      title: 'MOVEMENT_PROTOCOL',
      description: 'ANALYZE: Daily steps impact since 2020',
      icon: '🚶',
      category: 'health',
      inputLabel: 'DAILY_STEPS',
      inputType: 'number',
      inputProps: { min: 1000, max: 20000, step: 500, placeholder: '5000' },
      calculate: (steps: number) => {
        const daysWalking = 365 * 4;
        const totalSteps = steps * daysWalking;
        const caloriesBurned = totalSteps * 0.04;
        const weightLoss = caloriesBurned / 3500;
        return {
          dailySteps: steps.toLocaleString(),
          totalSteps: totalSteps.toLocaleString(),
          caloriesBurned: caloriesBurned.toFixed(0),
          weightLoss: `${weightLoss.toFixed(1)} LBS`,
          healthScore: `${((steps / 10000) * 100).toFixed(0)}%`,
          aiSuggestion: 'STRATEGY: Progressive overload >> 2K base + 500 weekly'
        };
      }
    },

    // Productivity (8)
    reading: {
      title: 'KNOWLEDGE_ACQUISITION',
      description: 'COMPUTE: Daily reading compound effect',
      icon: '📚',
      category: 'productivity',
      inputLabel: 'PAGES_READ/DAY',
      inputType: 'number',
      inputProps: { min: 5, max: 100, step: 5, placeholder: '20' },
      calculate: (pages: number) => {
        const days = 365 * 3;
        const totalPages = pages * days;
        const booksRead = Math.floor(totalPages / 250);
        const knowledgeGain = booksRead * 15;
        return {
          dailyPages: pages,
          totalPages: totalPages.toLocaleString(),
          booksCompleted: booksRead,
          knowledgeHours: `${knowledgeGain} HOURS`,
          vocabularyIncrease: `+${(booksRead * 50).toLocaleString()} WORDS`,
          aiSuggestion: 'MIX_RATIO: 70% non-fiction >> 30% fiction optimal'
        };
      }
    },
    coding: {
      title: 'CODING_JOURNEY',
      description: 'TRACK: Programming skill development',
      icon: '💻',
      category: 'career',
      inputLabel: 'HOURS_PER_WEEK',
      inputType: 'number',
      inputProps: { min: 1, max: 40, placeholder: '10' },
      calculate: (hours: number) => {
        const weeksPerYear = 52;
        const totalHours = hours * weeksPerYear * 3; // 3 years
        const expertiseLevel = Math.min(totalHours / 100, 100);
        const projectsCompleted = Math.floor(totalHours / 50);
        return {
          weeklyHours: hours,
          totalHours: totalHours.toLocaleString(),
          expertiseLevel: `${expertiseLevel.toFixed(0)}%`,
          projectsCompleted: projectsCompleted,
          salaryIncrease: `+${(expertiseLevel * 1000).toFixed(0)} USD`,
          aiSuggestion: 'FOCUS: Build projects >> theory alone insufficient'
        };
      }
    }
  };

  const filteredScenarios = selectedCategory === 'all' 
    ? scenarios 
    : Object.fromEntries(
        Object.entries(scenarios).filter(([_, scenario]) => scenario.category === selectedCategory)
      );

  const handleSimulate = useCallback(() => {
    setShowResults(true);
    toast({
      title: "SIMULATION_COMPLETE",
      description: "Quantum analysis executed successfully",
      duration: 2000,
    });
  }, [toast]);

  const handleSaveScenario = useCallback((scenarioKey: string) => {
    setSavedScenarios(prev => 
      prev.includes(scenarioKey) 
        ? prev.filter(s => s !== scenarioKey)
        : [...prev, scenarioKey]
    );
    toast({
      title: savedScenarios.includes(scenarioKey) ? "BOOKMARK_REMOVED" : "BOOKMARK_SAVED",
      description: `Scenario ${savedScenarios.includes(scenarioKey) ? 'removed from' : 'added to'} favorites`,
      duration: 1500,
    });
  }, [savedScenarios, toast]);

  const handleExport = useCallback((format: 'csv' | 'json') => {
    const currentScenario = scenarios[activeScenario];
    const results = currentScenario.calculate(inputValues[activeScenario]);
    
    let exportData = '';
    const timestamp = new Date().toISOString();
    
    if (format === 'csv') {
      exportData = `Scenario,${currentScenario.title}\nTimestamp,${timestamp}\n`;
      Object.entries(results).forEach(([key, value]) => {
        exportData += `${key},${value}\n`;
      });
    } else {
      exportData = JSON.stringify({
        scenario: currentScenario.title,
        timestamp,
        input: inputValues[activeScenario],
        results
      }, null, 2);
    }
    
    const blob = new Blob([exportData], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `what-if-${activeScenario}-${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "EXPORT_COMPLETE",
      description: `Data exported as ${format.toUpperCase()}`,
      duration: 2000,
    });
    setShowExportModal(false);
  }, [activeScenario, inputValues, toast]);

  const currentScenario = scenarios[activeScenario];
  const results = showResults ? currentScenario.calculate(inputValues[activeScenario]) : null;

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="cyber-card mb-6 max-w-4xl mx-auto">
            <h1 className="text-6xl font-black mb-4 glitch-text" style={{ color: 'hsl(var(--cyber-cyan))' }}>
              WHAT_IF.EXE
            </h1>
            <div className="text-2xl font-bold" style={{ color: 'hsl(var(--cyber-magenta))' }}>
              &gt; QUANTUM_LIFE_SIMULATOR.v2.0 &lt;
            </div>
          </div>
          <p className="text-xl max-w-3xl mx-auto">
            [INITIALIZING] Quantum probability engine &gt;&gt; Analyze alternate timelines &gt;&gt; 
            Data-driven future projection system ONLINE
          </p>
        </div>

        {/* User Greeting */}
        <div className="text-center mb-8">
          <div className="cyber-card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'hsl(var(--cyber-yellow))' }}>
              Welcome, SANJANA_BONAGIRI
            </h2>
            <p className="text-lg">Your quantum simulation pod is ready for timeline analysis</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`cyber-button px-6 py-3 transition-all duration-300 ${
                selectedCategory === key ? 'scale-105' : 'hover:scale-105'
              }`}
              style={{
                background: selectedCategory === key ? `hsl(var(--${category.color}))` : 'transparent',
                color: selectedCategory === key ? 'black' : `hsl(var(--${category.color}))`,
                borderColor: `hsl(var(--${category.color}))`,
                boxShadow: selectedCategory === key ? `0 0 30px hsl(var(--${category.color}))` : `0 0 15px hsl(var(--${category.color}))`
              }}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        {/* Scenario Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(filteredScenarios).map(([key, scenario]) => {
            const category = categories[scenario.category as keyof typeof categories];
            const isSaved = savedScenarios.includes(key);
            
            return (
              <div
                key={key}
                onClick={() => {
                  setActiveScenario(key);
                  setShowResults(false);
                }}
                className={`cyber-card cursor-pointer transition-all duration-300 relative ${
                  activeScenario === key ? 'scale-105' : 'hover:scale-105'
                }`}
                style={{
                  borderColor: activeScenario === key 
                    ? `hsl(var(--${category.color}))` 
                    : `hsl(var(--card-border))`,
                  boxShadow: activeScenario === key 
                    ? `0 0 40px hsl(var(--${category.color}))` 
                    : 'var(--glow-cyber)'
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveScenario(key);
                  }}
                  className="absolute top-4 right-4 p-2 transition-colors"
                  style={{ color: isSaved ? 'hsl(var(--cyber-yellow))' : 'hsl(var(--cyber-cyan))' }}
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
                
                <div className="text-4xl mb-4 neon-glow" style={{ color: `hsl(var(--${category.color}))` }}>
                  {scenario.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: `hsl(var(--${category.color}))` }}>
                  {scenario.title}
                </h3>
                <p className="text-sm mb-4 opacity-80">
                  {scenario.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs px-3 py-1 border rounded" style={{
                    color: `hsl(var(--${category.color}))`,
                    borderColor: `hsl(var(--${category.color}))`
                  }}>
                    [{category.name}]
                  </span>
                  {isSaved && (
                    <span className="text-xs" style={{ color: 'hsl(var(--cyber-yellow))' }}>
                      ★ SAVED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Section */}
        <div className="cyber-card mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'hsl(var(--cyber-cyan))' }}>
            &gt; {currentScenario.icon} {currentScenario.title} &lt;
          </h2>
          
          <div className="mb-6">
            <label className="block text-xl mb-4 font-bold" style={{ color: 'hsl(var(--cyber-yellow))' }}>
              [INPUT] {currentScenario.inputLabel}
            </label>
            <input
              type={currentScenario.inputType}
              value={inputValues[activeScenario]}
              onChange={(e) => setInputValues(prev => ({
                ...prev,
                [activeScenario]: Number(e.target.value)
              }))}
              className="cyber-input"
              {...currentScenario.inputProps}
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleSimulate}
              className="cyber-button-primary text-xl py-4 px-8 hover:scale-105"
            >
              &gt; EXECUTE_SIMULATION &lt;
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && results && (
          <div className="space-y-8">
            <div className="cyber-card">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold" style={{ color: 'hsl(var(--cyber-cyan))' }}>
                  &gt; SIMULATION_RESULTS &lt;
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleSaveScenario(activeScenario)}
                    className="cyber-button-secondary p-3"
                    title="Save Scenario"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowExportModal(true)}
                    className="cyber-button-secondary p-3"
                    title="Export Data"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(results, null, 2));
                      toast({
                        title: "COPIED_TO_CLIPBOARD",
                        description: "Results copied as JSON",
                        duration: 1500,
                      });
                    }}
                    className="cyber-button-secondary p-3"
                    title="Copy Results"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(results)
                  .filter(([key]) => key !== 'aiSuggestion')
                  .map(([key, value], index) => {
                    const colors = ['cyber-magenta', 'cyber-cyan', 'cyber-yellow', 'cyber-red', 'cyber-green', 'cyber-orange'];
                    const color = colors[index % colors.length];
                    
                    return (
                      <div
                        key={key}
                        className="text-center p-6 border-2 bg-black/90"
                        style={{
                          borderColor: `hsl(var(--${color}))`,
                          clipPath: 'var(--clip-diagonal)',
                          boxShadow: `0 0 25px hsl(var(--${color}) / 0.5)`
                        }}
                      >
                        <div
                          className="text-3xl font-bold mb-3 neon-glow"
                          style={{ color: `hsl(var(--${color}))` }}
                        >
                          {value}
                        </div>
                        <div className="text-sm uppercase tracking-wider opacity-80">
                          [{key.replace(/([A-Z])/g, '_$1').toUpperCase()}]
                        </div>
                      </div>
                    );
                  })}
              </div>

              {results.aiSuggestion && (
                <div className="mt-8 p-6 border-2" style={{
                  borderColor: 'hsl(var(--cyber-yellow))',
                  clipPath: 'var(--clip-corner)',
                  background: 'hsl(var(--cyber-yellow) / 0.1)'
                }}>
                  <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: 'hsl(var(--cyber-yellow))' }}>
                    &gt; AI_RECOMMENDATION.EXE &lt;
                  </h3>
                  <p className="text-xl font-bold text-center" style={{ color: 'hsl(var(--cyber-yellow))' }}>
                    {results.aiSuggestion}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="cyber-card max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'hsl(var(--cyber-cyan))' }}>
                &gt; EXPORT_DATA &lt;
              </h3>
              <div className="space-y-4">
                <button
                  onClick={() => handleExport('csv')}
                  className="cyber-button-secondary w-full py-4"
                >
                  Export as CSV
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="cyber-button-secondary w-full py-4"
                >
                  Export as JSON
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="cyber-button w-full py-4 border-2"
                  style={{ borderColor: 'hsl(var(--cyber-red))', color: 'hsl(var(--cyber-red))' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="cyber-card max-w-2xl mx-auto">
            <p className="mb-3 font-bold text-lg" style={{ color: 'hsl(var(--cyber-green))' }}>
              SYSTEM_STATUS: ONLINE &gt;&gt; SIMULATIONS: UNLIMITED &gt;&gt; USER: SANJANA_BONAGIRI
            </p>
            <p className="text-sm opacity-80">
              POWERED_BY: quantum_behavioral_analysis.exe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIfSimulator;