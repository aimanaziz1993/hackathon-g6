import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import mermaid from "mermaid";
import { 
  Bot, AlertTriangle, TrendingUp, Home, 
  DollarSign, Activity, ChevronDown, ChevronUp, 
  Zap, Brain, Heart, GraduationCap, Briefcase, Terminal, Cpu, ShieldCheck, Loader2, RefreshCw
} from 'lucide-react';
import { VectorLogoComponent } from '../Logo';
import { ScenariosComponentV2 } from '../scenarios/scenarioV2';
import { AI_MODELS_LIST } from '../models/models';

// --- DATA: PRE-BUILT SCENARIOS ---
const SCENARIOS = ScenariosComponentV2;

const CONTEXT_TAGS = [
  { id: "Bad Debt", label: "⚠️ High Interest Debt" },
  { id: "Cash Surplus", label: "💰 High Cash Flow" },
  { id: "Car Lover", label: "🚗 Car Enthusiast" },
  { id: "PTPTN", label: "🎓 PTPTN Loan" },
  { id: "Wedding", label: "💍 Wedding Soon" },
  { id: "Kids", label: "👶 Children" },
  { id: "Freelancer", label: "💻 Variable Income" },
];

const AI_MODELS = AI_MODELS_LIST;

// --- VISUAL ASSETS ---
const VectorLogo = VectorLogoComponent;

// --- COMPONENT: HIGH VISIBILITY MERMAID CHART ---
const MermaidChart = ({ chartCode }) => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (chartCode && chartRef.current) {
      // ACCESSIBILITY & VISIBILITY CONFIGURATION
      mermaid.initialize({ 
        startOnLoad: true, 
        theme: 'base',
        securityLevel: 'loose',
        themeVariables: {
          darkMode: true,
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          fontSize: '18px',          // BIG FONT
          primaryColor: '#10B981',   // Emerald 500
          primaryTextColor: '#ffffff',
          primaryBorderColor: '#10B981',
          lineColor: '#34D399',
          secondaryColor: '#064E3B', // Emerald 900
          tertiaryColor: '#1f2937',  // Gray 800
          
          // Specific Gantt High Contrast Colors
          excludeBkgColor: '#1f2937',
          sectionBkgColor: '#111827',
          altSectionBkgColor: '#1f2937',
          taskBorderColor: '#10B981',
          taskBkgColor: '#059669',
          activeTaskBorderColor: '#34D399',
          activeTaskBkgColor: '#10B981',
          gridColor: '#374151',
          todayLineColor: '#F59E0B',
          titleColor: '#ffffff',
          sectionTextColor: '#10B981' // Green Section Headers
        },
        gantt: {
          titleTopMargin: 25,
          barHeight: 50,      // FAT BARS for visibility
          barGap: 10,
          topPadding: 75,
          sidePadding: 75,
          fontSize: 18,       // Explicit Gantt font size
          sectionFontSize: 20,// Section Headers (Phase 1, etc)
          numberSectionStyles: 2,
          axisFormat: '%Y',
        }
      });
      
      const renderChart = async () => {
        try {
          chartRef.current.innerHTML = '';
          const { svg } = await mermaid.render(`mermaid-svg-${Date.now()}`, chartCode);
          chartRef.current.innerHTML = svg;
          
          // Force SVG to not squish
          const svgElement = chartRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.maxWidth = 'none'; 
            svgElement.style.height = 'auto';
            svgElement.style.fontWeight = 'bold'; // Force bold text
          }
        } catch (error) {
          console.error("Mermaid Render Error:", error);
          chartRef.current.innerHTML = "<p class='text-red-500 text-sm font-mono p-4'>Timeline generation failed. Please try again.</p>";
        }
      };
      
      renderChart();
    }
  }, [chartCode]);

  return (
    <div className="w-full bg-gray-900 border border-gray-700 rounded-xl mt-8 animate-fadeIn overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
        <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
          <Activity size={16} className="text-emerald-500" /> 
          Strategic Timeline
        </h4>
        <span className="text-[10px] text-emerald-500/80 uppercase font-mono tracking-widest border border-emerald-900 px-2 py-1 rounded">
           Scroll →
        </span>
      </div>
      
      {/* Scrollable Container with Min-Width to force size */}
      <div className="overflow-x-auto p-6 bg-[#0B0F19]">
        <div ref={chartRef} className="min-w-[1200px] flex justify-center"></div>
      </div>
    </div>
  );
};

export default function VectorAI() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");
  
  const [status, setStatus] = useState('input'); 
  const [aiResponse, setAiResponse] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [showPromptPreview, setShowPromptPreview] = useState(false);
  
  const [formData, setFormData] = useState(SCENARIOS.high_earner.data);

  const loadScenario = (key) => {
    setFormData(SCENARIOS[key].data);
  };

  const toggleTag = (tagId) => {
    setFormData(prev => {
      const tags = prev.activeTags || [];
      if (tags.includes(tagId)) {
        return { ...prev, activeTags: tags.filter(t => t !== tagId) };
      }
      return { ...prev, activeTags: [...tags, tagId] };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePrompt = () => {
    return `
ROLE: You are "Vector," an elite AI Wealth Architect specializing in Malaysian financial planning.
TONE: Direct, empathetic, mathematically precise, and slightly visionary.

USER PROFILE:
- Net Income: RM ${formData.salary}
- Monthly Outflow: RM ${formData.expenses}
- Planning Horizon: ${formData.horizon} Years
- Primary Goal: ${formData.goalType}
- Life Context Tags: ${formData.activeTags?.join(", ")}

RAW FINANCIAL DUMP:
"""
${formData.context}
"""

USER'S BURNING QUESTION:
"${formData.specificQuestion}"

CORE INSTRUCTIONS:
1. **Psychological Check:** Analyze their spending behavior based on the "Raw Dump". (e.g., Are they overpaying loans? Hoarding cash? Ignoring high interest?)
2. **The "Cash Kill" Strategy:** If they have a surplus, find the mathematical best way to use it immediately.
3. **DSR Check:** Simulate their Debt Service Ratio for future loans.
4. **Visual Data:** Generate a Mermaid.js Gantt chart string.

OUTPUT FORMAT (JSON ONLY):
{
  "summary": "2-3 sentences hooking the user with a specific insight.",
  "surplus": "Calculated Surplus",
  "psychology": "One sentence observation about their financial behavior (e.g., 'You are technically rich but structurally inefficient').",
  "actions": [
    { "type": "critical", "title": "Immediate Action", "desc": "What to do today", "impact": "RM Value Saved" },
    { "type": "warning", "title": "Optimization", "desc": "What to fix", "impact": "Impact" },
    { "type": "info", "title": "Strategic Move", "desc": "Long term play", "impact": "Impact" }
  ],
  "roadmap": [
    { "year": "Year/Date", "title": "Milestone", "desc": "Details" }
  ],
  "mermaidCode": "gantt\\n    title Strategic Timeline\\n    dateFormat YYYY-MM\\n    section Strategy\\n    ..."
}
    `.trim();
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleAnalyze = async () => {
    if (!apiKey) return alert("API Key Missing");
    
    setStatus('analyzing');
    setLoadingMsg("Parsing unstructured financial data...");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: selectedModel });
    const prompt = generatePrompt();

    const maxRetries = 3;
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
      try {
        attempt++;
        if (attempt > 1) setLoadingMsg(`Server overloaded. Retrying (Attempt ${attempt}/${maxRetries})...`);

        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```json|```/g, "").trim();
        setAiResponse(JSON.parse(text));
        
        success = true;
        setStatus('results');

      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        if (attempt === maxRetries) {
          setStatus('error');
        } else {
          await sleep(2000 * attempt);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans pb-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 animate-slideUp">
          <div className="flex items-center gap-4">
            <VectorLogo />
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">VECTOR AI</h1>
              <p className="text-xs text-gray-400 font-mono tracking-widest uppercase">Wealth Architecture Engine</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3">
            {/* MODEL SELECTOR */}
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 px-3 py-2 rounded-lg group hover:border-emerald-500/50 transition-colors">
              <Cpu size={14} className="text-emerald-500" />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold uppercase leading-none">Agent Model</span>
                <select 
                  value={selectedModel} 
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-transparent text-xs text-white font-mono outline-none cursor-pointer appearance-none min-w-[140px]"
                >
                  {AI_MODELS.map(m => (
                    <option key={m.id} value={m.id} className="bg-gray-900 text-gray-300">
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              <ChevronDown size={12} className="text-gray-600" />
            </div>

            {/* API KEY INDICATOR */}
            {/* <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg">
              <ShieldCheck size={14} className="text-gray-500" />
              <span className="text-[10px] text-gray-400 font-medium">
                {import.meta.env.VITE_GEMINI_API_KEY ? "SECURELY LOADED" : "NO KEY"}
              </span>
            </div> */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-full">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span className="text-[10px] text-gray-400 font-medium">{import.meta.env.VITE_GEMINI_API_KEY ? "SECURE CONNECTION" : "NO KEY FOUND"}</span>
            </div>
          </div>
        </div>

        {/* --- INPUT DASHBOARD --- */}
        {(status === 'input' || status === 'error') && (
          <div className="space-y-8 animate-slideUp">
            
            {status === 'error' && (
              <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg flex items-center gap-3">
                 <AlertTriangle className="text-red-400" size={20} />
                 <div>
                   <h4 className="text-red-400 font-bold text-sm">Analysis Failed (503 Overloaded)</h4>
                   <p className="text-gray-400 text-xs">Google's servers are busy. Please wait 10 seconds or switch to a different model in the top right.</p>
                 </div>
                 <button onClick={handleAnalyze} className="ml-auto bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1 rounded text-xs border border-red-500/30">
                   Retry
                 </button>
              </div>
            )}

            {/* SCENARIO SELECTOR */}
            <div className="bg-gray-900/50 p-1 rounded-xl border border-gray-800 flex overflow-x-auto">
              {Object.entries(SCENARIOS).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => loadScenario(key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                    JSON.stringify(formData.context) === JSON.stringify(info.data.context)
                      ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                      : "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {info.icon}
                  {info.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* HARD NUMBERS */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
                  <h3 className="text-gray-400 text-xs font-bold uppercase mb-4 flex items-center gap-2">
                    <DollarSign size={14}/> Core Financials
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Net Monthly Income</label>
                      <input name="salary" value={formData.salary} onChange={handleInputChange} className="w-full bg-transparent border-b border-gray-700 py-2 text-xl font-mono text-white focus:border-emerald-500 outline-none transition" />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Commitments</label>
                      <input name="expenses" value={formData.expenses} onChange={handleInputChange} className="w-full bg-transparent border-b border-gray-700 py-2 text-xl font-mono text-white focus:border-emerald-500 outline-none transition" />
                    </div>
                    <div>
                       <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Objective</label>
                       <select 
                        name="goalType" 
                        value={formData.goalType} 
                        onChange={handleInputChange} 
                        className="w-full bg-transparent border-b border-gray-700 py-2 text-xs font-mono text-white focus:border-emerald-500 outline-none transition">
                        <option value="property_wealth" className="bg-gray-900 text-gray-300">Build Property Portfolio</option>
                        <option value="debt_clearance" className="bg-gray-900 text-gray-300">Kill All Debt Fast</option>
                        <option value="retirement" className="bg-gray-900 text-gray-300">FIRE (Retire Early)</option>
                       </select>

                        {/* <select 
                          value={selectedModel} 
                          onChange={(e) => setSelectedModel(e.target.value)}
                          className="bg-transparent text-xs text-white font-mono outline-none cursor-pointer appearance-none min-w-[140px]"
                        >
                          {AI_MODELS.map(m => (
                            <option key={m.id} value={m.id} className="bg-gray-900 text-gray-300">
                              {m.name}
                            </option>
                          ))}
                        </select> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* SMART CONTEXT */}
              <div className="lg:col-span-2 space-y-4">
                
                {/* Context Tags */}
                <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
                   <h3 className="text-gray-400 text-xs font-bold uppercase mb-4 flex items-center gap-2">
                    <Zap size={14}/> Life Context (Click to Add)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {CONTEXT_TAGS.map(tag => (
                      <button
                        key={tag.id}
                        onClick={() => toggleTag(tag.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          formData.activeTags?.includes(tag.id)
                            ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                            : "bg-gray-800 border-gray-700 text-gray-500 hover:border-gray-500"
                        }`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brain Dump */}
                <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl relative group focus-within:border-emerald-500/50 transition-colors">
                  <div className="absolute top-5 right-5 text-gray-600 group-focus-within:text-emerald-500 transition-colors">
                    <Brain size={18} />
                  </div>
                  <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">The Brain Dump</h3>
                  <textarea 
                    name="context" 
                    value={formData.context} 
                    onChange={handleInputChange} 
                    rows={4}
                    className="w-full bg-transparent border-none p-0 text-sm font-mono text-gray-300 focus:ring-0 resize-none leading-relaxed placeholder-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* ACTION AREA */}
            <div className="mt-8">
              <button 
                onClick={() => setShowPromptPreview(!showPromptPreview)}
                className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-emerald-400 mb-3 transition-colors ml-1"
              >
                {showPromptPreview ? <ChevronUp size={14} /> : <Terminal size={14} />}
                {showPromptPreview ? "Hide Terminal" : "View Live Prompt Construction"}
              </button>

              {showPromptPreview && (
                <div className="bg-black border border-gray-800 rounded-xl p-4 mb-4 font-mono text-xs text-emerald-400/80 leading-relaxed whitespace-pre-wrap h-64 overflow-y-auto animate-fadeIn shadow-inner">
                  {generatePrompt()}
                </div>
              )}

              <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-1 rounded-2xl border border-gray-800">
                <div className="flex items-center gap-4 p-2">
                  <div className="flex-1 px-4">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Specific Question</label>
                    <input 
                      name="specificQuestion" 
                      value={formData.specificQuestion} 
                      onChange={handleInputChange} 
                      className="w-full bg-transparent border-none p-0 text-white focus:ring-0 placeholder-gray-600 font-medium"
                      placeholder="Ask Vector anything..."
                    />
                  </div>
                  <button 
                    onClick={handleAnalyze}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/20 hover:scale-[1.02]"
                  >
                    <Bot size={20} />
                    Analyze
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- LOADING STATE --- */}
        {status === 'analyzing' && (
          <div className="flex flex-col items-center justify-center py-24 animate-pulse">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 border-t-2 border-emerald-500 rounded-full animate-spin"></div>
              <Bot size={32} className="text-emerald-400" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-bold text-white">Vector is Thinking</h3>
              <p className="text-xs font-mono text-emerald-500 uppercase tracking-widest">
                Agent: {selectedModel}
              </p>
              <div className="text-sm text-gray-500 font-mono mt-2 flex items-center justify-center gap-2">
                 <Loader2 size={14} className="animate-spin" />
                 {loadingMsg}
              </div>
            </div>
          </div>
        )}

        {/* --- RESULTS DASHBOARD --- */}
        {status === 'results' && aiResponse && (
          <div className="space-y-8 animate-zoomIn">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => setStatus('input')} className="text-xs text-gray-500 hover:text-white flex items-center gap-2">
                ← Refine Data
              </button>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-600 font-mono">Generated by {selectedModel}</span>
                <button onClick={handleAnalyze} className="text-gray-500 hover:text-emerald-400"><RefreshCw size={12} /></button>
              </div>
            </div>

            {/* HERO INSIGHT */}
            <div className="bg-gradient-to-r from-emerald-900/30 to-gray-900 border border-emerald-500/30 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="p-4 bg-emerald-500/20 rounded-2xl text-emerald-400 h-min">
                    <Activity size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Analysis Complete.</h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">{aiResponse.summary}</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="bg-gray-800/80 px-4 py-2 rounded-lg border border-gray-700 backdrop-blur-sm">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide block mb-1">Monthly Surplus</span>
                        <span className="text-xl font-bold text-emerald-400">{aiResponse.surplus}</span>
                      </div>
                      <div className="bg-gray-800/80 px-4 py-2 rounded-lg border border-gray-700 backdrop-blur-sm">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide block mb-1">Behavioral Profile</span>
                        <span className="text-sm font-medium text-white">{aiResponse.psychology}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION GRID */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">The Execution Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiResponse.actions.map((action, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] cursor-default ${
                    action.type === 'critical' ? 'bg-red-500/10 border-red-500/30' : 
                    action.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30' : 
                    'bg-gray-800/50 border-gray-700'
                  }`}>
                    <div className="flex justify-between mb-3">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                        action.type === 'critical' ? 'bg-red-500/20 text-red-400' : 
                        action.type === 'warning' ? 'bg-amber-500/20 text-amber-400' : 
                        'bg-blue-500/20 text-blue-400'
                      }`}>{action.type}</span>
                    </div>
                    <h4 className="font-bold text-white text-lg mb-2">{action.title}</h4>
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">{action.desc}</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                      <TrendingUp size={16} /> {action.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VISUALS & ROADMAP */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                 {aiResponse.mermaidCode && <MermaidChart chartCode={aiResponse.mermaidCode} />}
              </div>
              <div className="lg:col-span-1 bg-gray-900/50 p-6 rounded-xl border border-gray-700 mt-6 h-fit">
                <h4 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">Milestones</h4>
                <div className="space-y-6 relative border-l border-gray-700 ml-2">
                  {aiResponse.roadmap.map((step, idx) => (
                    <div key={idx} className="pl-6 relative">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981]"></div>
                      <div className="text-xs font-mono text-emerald-500 mb-1">{step.year}</div>
                      <div className="text-sm font-bold text-white">{step.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{step.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}