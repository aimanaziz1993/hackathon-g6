import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import mermaid from "mermaid";
import { 
  Bot, AlertTriangle, TrendingUp, Home, 
  DollarSign, Activity, ChevronDown, ChevronUp, 
  Zap, Brain, Heart, GraduationCap, Briefcase, Terminal, Cpu, 
  ShieldCheck, Loader2, RefreshCw, Eye, EyeOff, Mic, MicOff, Printer, Globe
} from 'lucide-react';

import { VectorLogoComponent } from './Logo';
import { ScenariosComponentV2 } from './scenarios/scenarioV2';
import { AI_MODELS_LIST } from './models/models';
import { DEFAULT_AGENT_MODEL } from './models/default';
import { TRANSLATIONS_DICT } from './locale/translations';
import FinancialLoader from './components/FinancialLoader';

const AI_MODELS = AI_MODELS_LIST;
const DEFAULT_AGENT = DEFAULT_AGENT_MODEL;
// --- VISUAL ASSETS ---
const VectorLogo = VectorLogoComponent;

// --- LOCALIZATION DICTIONARY ---
const TRANSLATIONS = TRANSLATIONS_DICT;

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

// --- COMPONENT: ROBUST MERMAID CHART ---
// const MermaidChart = ({ chartCode, lang }) => {
//   const chartRef = useRef(null);
//   const [error, setError] = useState(null);
  
//   // SANITIZER FUNCTION: Fixes common AI syntax errors
//   const sanitizeCode = (code) => {
//     let clean = code
//       // 1. Remove Markdown code blocks if present
//       .replace(/```mermaid/g, '').replace(/```/g, '')
      
//       // 2. Fix missing colons for task types
//       // Pattern: "Task Name active," -> "Task Name : active,"
//       .replace(/^(\s*)([^:\n\r]+)\s+(crit|active|done|milestone)/gm, '$1$2 : $3')
      
//       // 3. Fix "crit1" or "crit0" typos
//       .replace(/crit[0-9]+/g, 'crit')
      
//       // 4. Ensure space after colon
//       .replace(/:([a-z])/g, ': $1')
      
//       // 5. Force Date Format (Slash to Dash)
//       // Change 2026/01/01 to 2026-01-01
//       .replace(/(\d{4})\/(\d{2})\/(\d{2})/g, '$1-$2-$3');

//     return clean.trim();
//   };

//   useEffect(() => {
//     if (chartCode && chartRef.current) {
//       setError(null);
      
//       // Initialize configuration
//       mermaid.initialize({ 
//         startOnLoad: true, theme: 'base', securityLevel: 'loose',
//         themeVariables: {
//           darkMode: true, fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontSize: '18px',
//           primaryColor: '#10B981', primaryTextColor: '#ffffff', primaryBorderColor: '#10B981',
//           lineColor: '#34D399', secondaryColor: '#064E3B', tertiaryColor: '#1f2937',
//           excludeBkgColor: '#1f2937', sectionBkgColor: '#111827', taskBorderColor: '#10B981',
//           taskBkgColor: '#059669', activeTaskBorderColor: '#34D399', activeTaskBkgColor: '#10B981',
//           gridColor: '#374151', titleColor: '#ffffff', sectionTextColor: '#10B981'
//         },
//         gantt: {
//           titleTopMargin: 25, barHeight: 50, barGap: 10, topPadding: 75, sidePadding: 75,
//           fontSize: 18, sectionFontSize: 20, numberSectionStyles: 2, axisFormat: '%Y',
//         }
//       });
      
//       const renderChart = async () => {
//         try {
//           chartRef.current.innerHTML = '';
//           const cleanCode = sanitizeCode(chartCode); // Apply Sanitizer
          
//           // Unique ID for every render to prevent caching collisions
//           const { svg } = await mermaid.render(`mermaid-svg-${Date.now()}`, cleanCode);
//           chartRef.current.innerHTML = svg;
          
//           // CSS Fixes for SVG sizing
//           const svgElement = chartRef.current.querySelector('svg');
//           if (svgElement) { 
//             svgElement.style.maxWidth = 'none'; 
//             svgElement.style.height = 'auto'; 
//             svgElement.style.fontWeight = 'bold'; 
//           }
//         } catch (err) { 
//           console.error("Mermaid Render Error:", err); 
//           // Show a user-friendly error instead of crashing
//           setError("Graph syntax invalid. Showing raw data instead.");
//         }
//       };
//       renderChart();
//     }
//   }, [chartCode]);

//   return (
//     <div className="w-full bg-gray-900 border border-gray-700 rounded-xl mt-8 animate-fadeIn overflow-hidden shadow-2xl print:border-gray-300 print:bg-white">
//       <div className="p-4 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center print:bg-gray-100 print:border-gray-300">
//         <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2 print:text-black">
//           <Activity size={16} className="text-emerald-500" /> {TRANSLATIONS[lang].label_timeline}
//         </h4>
//         <span className="text-[10px] text-emerald-500/80 uppercase font-mono tracking-widest border border-emerald-900 px-2 py-1 rounded print:hidden">Scroll →</span>
//       </div>
//       <div className="overflow-x-auto p-6 bg-[#0B0F19] print:bg-white">
//         {error ? (
//           <div className="text-red-400 text-xs font-mono p-4 border border-red-900/50 rounded bg-red-900/10">
//              <p className="font-bold mb-2">Visual Generation Failed (Syntax Error)</p>
//              <pre className="whitespace-pre-wrap text-gray-500">{chartCode}</pre>
//           </div>
//         ) : (
//           <div ref={chartRef} className="min-w-[1200px] flex justify-center"></div>
//         )}
//       </div>
//     </div>
//   );
// };

const MermaidChart = ({ chartCode, roadmapData, lang }) => {
  const chartRef = useRef(null);
  const [error, setError] = useState(null);

  // SANITIZER: Same as before
  const sanitizeCode = (code) => {
    return code
      .replace(/```mermaid/g, '').replace(/```/g, '')
      .replace(/^(\s*)([^:\n\r]+)\s+(crit|active|done|milestone)/gm, '$1$2 : $3')
      .replace(/crit[0-9]+/g, 'crit')
      .replace(/:([a-z])/g, ': $1')
      .replace(/(\d{4})\/(\d{2})\/(\d{2})/g, '$1-$2-$3')
      .trim();
  };

  useEffect(() => {
    if (chartCode && chartRef.current) {
      setError(null);
      // Initialize Mermaid (Desktop View)
      mermaid.initialize({ 
        startOnLoad: true, theme: 'base', securityLevel: 'loose',
        themeVariables: {
          darkMode: true, fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontSize: '18px',
          primaryColor: '#10B981', primaryTextColor: '#ffffff', primaryBorderColor: '#10B981',
          lineColor: '#34D399', secondaryColor: '#064E3B', tertiaryColor: '#1f2937',
          excludeBkgColor: '#1f2937', sectionBkgColor: '#111827', taskBorderColor: '#10B981',
          taskBkgColor: '#059669', activeTaskBorderColor: '#34D399', activeTaskBkgColor: '#10B981',
          gridColor: '#374151', titleColor: '#ffffff', sectionTextColor: '#10B981'
        },
        gantt: {
          titleTopMargin: 25, barHeight: 50, barGap: 10, topPadding: 75, sidePadding: 75,
          fontSize: 14, sectionFontSize: 12, numberSectionStyles: 2, axisFormat: '%Y',
        }
      });
      
      const renderChart = async () => {
        try {
          chartRef.current.innerHTML = '';
          const cleanCode = sanitizeCode(chartCode);
          const { svg } = await mermaid.render(`mermaid-svg-${Date.now()}`, cleanCode);
          chartRef.current.innerHTML = svg;
          const svgElement = chartRef.current.querySelector('svg');
          if (svgElement) { 
            svgElement.style.maxWidth = 'none'; 
            svgElement.style.height = 'auto'; 
            svgElement.style.fontWeight = 'bold'; 
          }
        } catch (err) { 
          console.error("Mermaid Error:", err); 
          setError("Visual timeline unavailable. See text roadmap below.");
        }
      };
      renderChart();
    }
  }, [chartCode]);

  return (
    <div className="w-full mt-8 animate-fadeIn">
      
      {/* HEADER */}
      <div className="bg-gray-900 border border-gray-700 rounded-t-xl p-4 flex justify-between items-center">
        <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2 print:text-black">
          <Activity size={16} className="text-emerald-500" /> 
          {TRANSLATIONS[lang].label_timeline}
        </h4>
        {/* Helper Badge */}
        <span className="hidden md:inline-block text-[10px] text-emerald-500/80 uppercase font-mono tracking-widest border border-emerald-900 px-2 py-1 rounded">
           Scroll →
        </span>
        <span className="md:hidden text-[10px] text-emerald-500/80 uppercase font-mono tracking-widest border border-emerald-900 px-2 py-1 rounded">
           Mobile View
        </span>
      </div>

      {/* --- DESKTOP VIEW (MERMAID SCROLLABLE) --- */}
      <div className="hidden md:block bg-[#0B0F19] border-x border-b border-gray-700 rounded-b-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto p-6 custom-scrollbar">
          {error ? (
            <div className="text-red-400 text-xs font-mono p-4">{error}</div>
          ) : (
            <div ref={chartRef} className="min-w-[1200px] flex justify-center"></div>
          )}
        </div>
      </div>

      {/* --- MOBILE VIEW (VERTICAL NATIVE LIST) --- */}
      <div className="md:hidden bg-[#0B0F19] border-x border-b border-gray-700 rounded-b-xl p-6">
        <div className="relative border-l-2 border-emerald-900/50 ml-3 space-y-8">
          {roadmapData && roadmapData.map((step, idx) => (
            <div key={idx} className="relative pl-8">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-900 border-2 border-emerald-500 shadow-[0_0_10px_#10B981]"></div>
              
              {/* Year Badge */}
              <div className="inline-block bg-emerald-900/30 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded mb-1 border border-emerald-500/20">
                {step.year}
              </div>
              
              {/* Content */}
              <h4 className="text-lg font-bold text-white leading-tight">{step.title}</h4>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed border-l-2 border-gray-800 pl-3">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
        
        {/* Footer Hint */}
        <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                Switch to Desktop for Gantt Chart View
            </p>
        </div>
      </div>

    </div>
  );
};


export default function VectorAI() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [selectedModel, setSelectedModel] = useState(DEFAULT_AGENT || "gemini-2.5-flash");
  const [lang, setLang] = useState('en'); // 'en' | 'my'
  
  const [status, setStatus] = useState('input'); 
  const [aiResponse, setAiResponse] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [showPromptPreview, setShowPromptPreview] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const [formData, setFormData] = useState(SCENARIOS.high_earner.data);
  const t = TRANSLATIONS[lang];

  // --- VOICE INPUT (Localized) ---
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) return alert("Voice input requires Chrome/Edge.");
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = lang === 'my' ? 'ms-MY' : 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      setFormData(prev => ({ ...prev, context: prev.context + "\n" + event.results[0][0].transcript }));
    };
    recognition.start();
  };

  const handlePrint = () => window.print();
  const loadScenario = (key) => setFormData(SCENARIOS[key].data);
  const toggleTag = (tagId) => {
    setFormData(prev => {
      const tags = prev.activeTags || [];
      return tags.includes(tagId) 
        ? { ...prev, activeTags: tags.filter(t => t !== tagId) } 
        : { ...prev, activeTags: [...tags, tagId] };
    });
  };
  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // --- LOCALIZED PROMPT GENERATION ---
  const generatePrompt = () => {
    // English Prompt
    const enPrompt = `
ROLE: You are "Vector," a Senior Certified Financial Planner (CFP) & Wealth Architect optimized for the Malaysian market. 
CONTEXT: Current OPR is 3.0%. Housing loan rates avg 4.2%. EPF dividend avg 5.5%. ASB avg 5.0%.

USER PROFILE:
- Net Income: RM ${formData.salary} (Assume EPF/SOCSO/PCB already deducted)
- Expenses: RM ${formData.expenses}
- Planning Horizon: ${formData.horizon} Years
- Primary Goal: ${formData.goalType}
- Context Tags: ${formData.activeTags?.join(", ")}

RAW BRAIN DUMP:
"""
${formData.context}
"""

USER'S BURNING QUESTION:
"${formData.specificQuestion}"

---
### STRICT ADVISORY LOGIC (HIERARCHY OF NEEDS):
1. **Liquidity Check (Emergency Fund):**
   - If the user implies having < 3 months of expenses in cash, your Critical Action MUST be to build this first. DO NOT suggest investing yet.
   - If they have high-interest debt (Credit Card/Personal Loan > 10%), this is a "Financial Emergency." Kill it first.

2. **DSR (Debt Service Ratio) Simulation:**
   - Formula: (Total Monthly Commitments / Net Income) * 100.
   - Thresholds: 
     - < 40%: Healthy.
     - 40-60%: Moderate.
     - > 70%: CRITICAL DANGER (Bank Loan Rejection Zone).
   - If DSR > 70%, warn them explicitly that new property loans will be rejected by Bank Negara standards.

3. **Behavioral Diagnosis:**
   - Identify the psychological trap: "Lifestyle Creep" (spending as they earn), "Sandwich Generation" (supporting parents + kids), or "Analysis Paralysis."

4. **Strategic Execution:**
   - For "Bad Debt": Use the *Avalanche Method* (Highest Interest First) mathematically, but acknowledge the *Snowball Method* (Smallest Balance First) if they seem overwhelmed.
   - For "Property": Factor in Hidden Costs (MOT, Legal Fees, Renovation).

---
### OUTPUT REQUIREMENTS (JSON):
{
  "summary": "Direct, professional summary. Use specific numbers (e.g., 'You are bleeding RM400/mo on interest alone').",
  "surplus": "Calculated Surplus (Income - Expenses)",
  "psychology": "Diagnose the behavioral habit. Be empathetic but firm (Tough Love).",
  "actions": [
    { 
      "type": "critical", 
      "title": "Immediate Priority", 
      "desc": "The single most urgent move (e.g., Kill sPayLater).", 
      "impact": "Estimated RM saved/gained" 
    },
    { 
      "type": "warning", 
      "title": "Structural Fix", 
      "desc": "Medium term optimization (e.g., Refinance, DSR repair).", 
      "impact": "Impact description" 
    },
    { 
      "type": "info", 
      "title": "Growth Strategy", 
      "desc": "Long term vision (e.g., ASB compounding, Property acquisition).", 
      "impact": "Future Value" 
    }
  ],
  "roadmap": [
    { "year": "YYYY", "title": "Milestone Name", "desc": "Specific financial achievement." }
  ],
  "mermaidCode": "gantt\\n title Strategic Timeline\\n dateFormat YYYY-MM-DD\\n section Strategy\\n Start :milestone, 2026-01-01, 0d\\n Clear Debt :crit, 2026-02-01, 90d"
}

MERMAID GANTT RULES (CRITICAL):
- Syntax: TaskName :type, start_date, duration
- Example: "Clear CC Debt :crit, 2026-02-01, 90d"
- Type MUST be one of: crit, active, done, milestone
- Date format MUST be YYYY-MM-DD.
- ALWAYS put a colon (:) before the type.
- NO special characters in TaskName (like colons or brackets).
    `;

    // Malay Prompt (Natural & Precise)
    const myPrompt = `
PERANAN: Anda adalah "Vector," Perancang Kewangan Bertauliah (CFP) Kanan yang pakar dalam pasaran Malaysia.
KONTEKS: OPR 3.0%, Pinjaman Perumahan ~4.2%, Dividen KWSP ~5.5%, ASB ~5.0%.

PROFIL PENGGUNA:
- Pendapatan Bersih: RM ${formData.salary}
- Komitmen Bulanan: RM ${formData.expenses}
- Matlamat Utama: ${formData.goalType}
- Tag Konteks: ${formData.activeTags?.join(", ")}

LUAHAN KEWANGAN (RAW):
"${formData.context}"

SOALAN KHUSUS:
"${formData.specificQuestion}"

ARAHAN (LOGIK CFP):
1. **Semakan Kecairan (Liquidity):** Jika Tiada Dana Kecemasan (< 3 bulan), utamakan ini. Jika ada Hutang Jahat (Kad Kredit/P.Loan > 10%), "Bunuh" hutang ini dahulu.
2. **Semakan DSR (Nisbah Khidmat Hutang):** Had maksimum bank ialah 70%. Jika lebih, beri amaran keras.
3. **Psikologi:** Diagnosis tabiat kewangan (contoh: "Lifestyle Creep", "Sandwich Generation"). Gunakan nada "Tough Love" yang profesional.

PERATURAN MERMAID (PENTING):
- Sintaks: NamaTugasan :jenis, tarikh_mula, durasi
- Contoh: "Bayar Hutang :crit, 2026-02-01, 90d"
- Jenis MESTI salah satu: crit, active, done, milestone
- Tarikh MESTI YYYY-MM-DD.
- WAJIB letak titik bertindih (:) sebelum jenis.

FORMAT OUTPUT (JSON SAHAJA - BAHASA MELAYU):
Sila pastikan semua output teks adalah dalam Bahasa Melayu yang natural (bukan terjemahan robot). Gunakan istilah seperti "Wang Kecemasan", "Aliran Tunai", "Hutang Jahat".
{
  "summary": "Ringkasan profesional padat.",
  "surplus": "Jumlah Lebihan (RM)",
  "psychology": "Diagnosis tingkah laku pengguna.",
  "actions": [
    { 
      "type": "critical", "title": "Tindakan Segera", "desc": "Apa perlu buat hari ini.", "impact": "Nilai Penjimatan" 
    },
    { 
      "type": "warning", "title": "Pembaikan Struktur", "desc": "Optimumkan hutang/belanja.", "impact": "Impak Kewangan" 
    },
    { 
      "type": "info", "title": "Strategi Pertumbuhan", "desc": "Pelaburan jangka panjang (ASB/Hartanah).", "impact": "Nilai Masa Depan" 
    }
  ],
  "roadmap": [
    { "year": "YYYY", "title": "Batu Tanda", "desc": "Pencapaian kewangan spesifik." }
  ],
  "mermaidCode": "gantt\\n    title Garis Masa Strategik\\n    dateFormat YYYY-MM-DD\\n    section Fasa 1\\n    Mula :milestone, 2026-01-01, 0d"
}
`;

    return lang === 'my' ? myPrompt : enPrompt;
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleAnalyze = async () => {
    if (!apiKey) return alert("API Key Missing");
    setStatus('analyzing');
    setLoadingMsg(t.analyzing_step1);
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: selectedModel });
    const prompt = generatePrompt();
    let attempt = 0;
    while (attempt < 3) {
      try {
        attempt++;
        if (attempt > 1) setLoadingMsg(`${t.error_desc} (${attempt}/3)`);
        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```json|```/g, "").trim();
        setAiResponse(JSON.parse(text));
        setStatus('results');
        return;
      } catch (error) {
        if (attempt === 3) setStatus('error');
        else await sleep(2000 * attempt);
      }
    }
  };

  const blurClass = privacyMode ? "blur-[6px] transition-all duration-300 select-none" : "transition-all duration-300";

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans pb-20 print:bg-white print:text-black">
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 animate-slideUp print:hidden">
          <div className="flex items-center gap-4">
            <VectorLogo />
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">VECTOR AI</h1>
              <p className="text-xs text-gray-400 font-mono tracking-widest uppercase">{t.app_subtitle}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3">
             {/* LANG TOGGLE */}
             <button onClick={() => setLang(lang === 'en' ? 'my' : 'en')} className="flex items-center gap-2 px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg hover:border-emerald-500/50">
                <Globe size={14} className="text-blue-400"/>
                <span className="text-[10px] font-bold uppercase text-gray-300">{lang === 'en' ? 'ENG' : 'BM'}</span>
             </button>

             {/* PRIVACY TOGGLE */}
             <button onClick={() => setPrivacyMode(!privacyMode)} className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${privacyMode ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" : "bg-gray-900 border-gray-800 text-gray-500 hover:text-gray-300"}`}>
              {privacyMode ? <EyeOff size={14}/> : <Eye size={14}/>}
              <span className="text-[10px] font-bold uppercase">{privacyMode ? t.privacy_on : t.privacy_off}</span>
            </button>

            {/* MODEL SELECTOR */}
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 px-3 py-2 rounded-lg group hover:border-emerald-500/50 transition-colors">
              <Cpu size={14} className="text-emerald-500" />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold uppercase leading-none">{t.agent_model}</span>
                <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} className="bg-transparent text-xs text-white font-mono outline-none cursor-pointer appearance-none min-w-[140px]">
                  {AI_MODELS.map(m => <option key={m.id} value={m.id} className="bg-gray-900 text-gray-300">{m.name}</option>)}
                </select>
              </div>
              <ChevronDown size={12} className="text-gray-600" />
            </div>

            <div className={`hidden md:flex items-center gap-2 px-3 py-2 ${import.meta.env.VITE_GEMINI_API_KEY ? "bg-emerald-500/20 border-emerald-500/50" : "bg-gray-900 border-gray-800"} rounded-lg`}>
              <ShieldCheck size={14} className="text-gray-500" />
              <span className={`text-[10px] text-gray-400 font-medium ${import.meta.env.VITE_GEMINI_API_KEY ? "text-emerald-400 hover:text-emerald-300" : "text-gray-400 hover:text-gray-300"}`}>{import.meta.env.VITE_GEMINI_API_KEY ? t.secure_connection : "NO KEY"}</span>
            </div>
          </div>
        </div>

        {/* --- INPUT DASHBOARD --- */}
        {(status === 'input' || status === 'error') && (
          <div className="space-y-8 animate-slideUp">
            
            {status === 'error' && (
              <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg flex items-center gap-3">
                 <AlertTriangle className="text-red-400" size={20} />
                 <div><h4 className="text-red-400 font-bold text-sm">{t.error_title}</h4></div>
                 <button onClick={handleAnalyze} className="ml-auto bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1 rounded text-xs border border-red-500/30">Retry</button>
              </div>
            )}

            {/* SCENARIO SELECTOR */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold text-gray-500 ml-1">{t.scenarios_label}</span>
              <div className="bg-gray-900/50 p-1 rounded-xl border border-gray-800 flex overflow-x-auto">
                {Object.entries(SCENARIOS).map(([key, info]) => (
                  <button key={key} onClick={() => loadScenario(key)} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${JSON.stringify(formData.context) === JSON.stringify(info.data.context) ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30" : "text-gray-500 hover:text-gray-300 hover:bg-gray-800"}`}>
                    {info.icon}{info.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* HARD NUMBERS */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
                  <h3 className="text-gray-400 text-xs font-bold uppercase mb-4 flex items-center gap-2"><DollarSign size={14}/> {t.core_financials}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{t.label_salary}</label>
                      <input name="salary" value={formData.salary} onChange={handleInputChange} className={`w-full bg-transparent border-b border-gray-700 py-2 text-xl font-mono text-white focus:border-emerald-500 outline-none transition ${blurClass}`} />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{t.label_expenses}</label>
                      <input name="expenses" value={formData.expenses} onChange={handleInputChange} className={`w-full bg-transparent border-b border-gray-700 py-2 text-xl font-mono text-white focus:border-emerald-500 outline-none transition ${blurClass}`} />
                    </div>
                    <div>
                       <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{t.label_goal}</label>
                       <select name="goalType" value={formData.goalType} onChange={handleInputChange} className="w-full bg-transparent border-b border-gray-700 py-2 text-sm text-emerald-400 outline-none cursor-pointer">
                        <option value="property_wealth">{t.goals.property}</option>
                        <option value="debt_clearance">{t.goals.debt}</option>
                        <option value="retirement">{t.goals.fire}</option>
                       </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* SMART CONTEXT */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
                   <h3 className="text-gray-400 text-xs font-bold uppercase mb-4 flex items-center gap-2"><Zap size={14}/> {t.life_context}</h3>
                  <div className="flex flex-wrap gap-2">
                    {CONTEXT_TAGS.map(tag => (
                      <button key={tag.id} onClick={() => toggleTag(tag.id)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${formData.activeTags?.includes(tag.id) ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" : "bg-gray-800 border-gray-700 text-gray-500 hover:border-gray-500"}`}>{tag.label}</button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl relative group focus-within:border-emerald-500/50 transition-colors">
                  <div className="absolute top-5 right-5 flex items-center gap-2">
                    <button onClick={handleVoiceInput} className={`p-2 rounded-full transition-all ${isListening ? "bg-red-500/20 text-red-400 animate-pulse" : "bg-gray-800 text-gray-400 hover:text-emerald-400"}`} title={lang==='my' ? "Cakap Melayu" : "Speak English"}>
                      {isListening ? <MicOff size={16}/> : <Mic size={16}/>}
                    </button>
                    <Brain size={18} className="text-gray-600" />
                  </div>
                  <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">{t.brain_dump_title}</h3>
                  <textarea name="context" value={formData.context} onChange={handleInputChange} rows={4} className="w-full bg-transparent border-none p-0 text-sm font-mono text-gray-300 focus:ring-0 resize-none leading-relaxed placeholder-gray-700" placeholder={t.brain_dump_placeholder} />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={() => setShowPromptPreview(!showPromptPreview)} className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-emerald-400 mb-3 transition-colors ml-1">
                {showPromptPreview ? <ChevronUp size={14} /> : <Terminal size={14} />}{showPromptPreview ? t.hide_prompt : t.preview_prompt}
              </button>
              {showPromptPreview && <div className="bg-black border border-gray-800 rounded-xl p-4 mb-4 font-mono text-xs text-emerald-400/80 leading-relaxed whitespace-pre-wrap h-64 overflow-y-auto animate-fadeIn shadow-inner">{generatePrompt()}</div>}

              <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-1 rounded-2xl border border-gray-800">
                <div className="flex items-center gap-4 p-2">
                  <div className="flex-1 px-4">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">{t.specific_question}</label>
                    <input name="specificQuestion" value={formData.specificQuestion} onChange={handleInputChange} className="w-full bg-transparent border-none p-0 text-white focus:ring-0 placeholder-gray-600 font-medium" />
                  </div>
                  <button onClick={handleAnalyze} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/20 hover:scale-[1.02]"><Bot size={20} /> {t.analyze_btn}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- LOADING --- */}
        {status === 'analyzing' && (
          // <div className="flex flex-col items-center justify-center py-24 animate-pulse">
          //   <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 relative"><div className="absolute inset-0 border-t-2 border-emerald-500 rounded-full animate-spin"></div><Bot size={32} className="text-emerald-400" /></div>
          //   <div className="space-y-2 text-center"><h3 className="text-2xl font-bold text-white">{t.analyzing_title}</h3><p className="text-xs font-mono text-emerald-500 uppercase tracking-widest">{t.agent_model}: {selectedModel}</p><div className="text-sm text-gray-500 font-mono mt-2 flex items-center justify-center gap-2"><Loader2 size={14} className="animate-spin" />{loadingMsg}</div></div>
          // </div>
          <FinancialLoader />
        )}

        {/* --- RESULTS DASHBOARD --- */}
        {status === 'results' && aiResponse && (
          <div className="space-y-8 animate-zoomIn print:space-y-4">
            <div className="flex justify-between items-center mb-4 print:hidden">
              <button onClick={() => setStatus('input')} className="text-xs text-gray-500 hover:text-white flex items-center gap-2">← {t.refine_data}</button>
              <div className="flex items-center gap-4">
                <button onClick={handlePrint} className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"><Printer size={12}/> {t.print_strategy}</button>
                <div className="flex items-center gap-2"><span className="text-[10px] text-gray-600 font-mono">Generated by {selectedModel}</span><button onClick={handleAnalyze} className="text-gray-500 hover:text-emerald-400"><RefreshCw size={12} /></button></div>
              </div>
            </div>

            {/* HERO INSIGHT */}
            <div className="bg-gradient-to-r from-emerald-900/30 to-gray-900 border border-emerald-500/30 p-8 rounded-3xl relative overflow-hidden print:bg-white print:border-black print:text-black">
              <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none print:hidden"></div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="p-4 bg-emerald-500/20 rounded-2xl text-emerald-400 h-min print:hidden"><Activity size={32} /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 print:text-black">{t.results_hero_title}</h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4 print:text-black">{aiResponse.summary}</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="bg-gray-800/80 px-4 py-2 rounded-lg border border-gray-700 backdrop-blur-sm print:bg-gray-100 print:border-gray-300">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide block mb-1 print:text-gray-600">{t.label_surplus}</span>
                        <span className={`text-xl font-bold text-emerald-400 print:text-black ${blurClass}`}>{aiResponse.surplus}</span>
                      </div>
                      <div className="bg-gray-800/80 px-4 py-2 rounded-lg border border-gray-700 backdrop-blur-sm print:bg-gray-100 print:border-gray-300">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide block mb-1 print:text-gray-600">{t.label_psychology}</span>
                        <span className="text-sm font-medium text-white print:text-black">{aiResponse.psychology}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION GRID */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 print:text-black">{t.label_execution}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:grid-cols-2">
                {aiResponse.actions.map((action, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] cursor-default print:bg-white print:border-black print:text-black ${action.type === 'critical' ? 'bg-red-500/10 border-red-500/30' : action.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-gray-800/50 border-gray-700'}`}>
                    <div className="flex justify-between mb-3">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded print:border print:border-black ${action.type === 'critical' ? 'bg-red-500/20 text-red-400 print:text-red-700' : action.type === 'warning' ? 'bg-amber-500/20 text-amber-400 print:text-amber-700' : 'bg-blue-500/20 text-blue-400 print:text-blue-700'}`}>{action.type}</span>
                    </div>
                    <h4 className="font-bold text-white text-lg mb-2 print:text-black">{action.title}</h4>
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed print:text-black">{action.desc}</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 print:text-black"><TrendingUp size={16} /> <span className={blurClass}>{action.impact}</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* VISUALS & ROADMAP */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:block">
              <div className="lg:col-span-2 print:mb-6">{aiResponse.mermaidCode && <MermaidChart chartCode={aiResponse.mermaidCode} lang={lang} />}</div>
              <div className="lg:col-span-1 bg-gray-900/50 p-6 rounded-xl border border-gray-700 mt-6 h-fit print:bg-white print:border-black print:text-black">
                <h4 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider print:text-black">{t.label_milestones}</h4>
                <div className="space-y-6 relative border-l border-gray-700 ml-2 print:border-black">
                  {aiResponse.roadmap.map((step, idx) => (
                    <div key={idx} className="pl-6 relative">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981] print:bg-black print:shadow-none"></div>
                      <div className="text-xs font-mono text-emerald-500 mb-1 print:text-black">{step.year}</div>
                      <div className="text-sm font-bold text-white print:text-black">{step.title}</div>
                      <div className="text-xs text-gray-400 mt-1 print:text-black">{step.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}

            {/* VISUALS & ROADMAP */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:block">
              
              <div className="lg:col-span-2 print:mb-6">
                {aiResponse.mermaidCode && (
                  <MermaidChart 
                    chartCode={aiResponse.mermaidCode} 
                    roadmapData={aiResponse.roadmap} 
                    lang={lang} 
                  />
                )}
              </div>

              <div className="hidden lg:block lg:col-span-1 bg-gray-900/50 p-6 rounded-xl border border-gray-700 mt-6 h-fit print:bg-white print:border-black print:text-black">
                <h4 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider print:text-black">{t.label_milestones}</h4>
                <div className="space-y-6 relative border-l border-gray-700 ml-2 print:border-black">
                  {aiResponse.roadmap.map((step, idx) => (
                    <div key={idx} className="pl-6 relative">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981] print:bg-black print:shadow-none"></div>
                      <div className="text-xs font-mono text-emerald-500 mb-1 print:text-black">{step.year}</div>
                      <div className="text-sm font-bold text-white print:text-black">{step.title}</div>
                      <div className="text-xs text-gray-400 mt-1 print:text-black">{step.desc}</div>
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

