import { 
  Bot, AlertTriangle, TrendingUp, Home, 
  DollarSign, Activity, ChevronDown, ChevronUp, 
  FileText, Key, Loader2, ShieldCheck, 
  Zap, Brain, Heart, GraduationCap, Briefcase, Terminal, Cpu
} from 'lucide-react';

export const ScenariosComponentV1 = {
    high_earner: {
      label: "The High Earner Trap",
      icon: <Briefcase size={16}/>,
      data: {
        salary: "7400",
        expenses: "3550",
        goalType: "property_wealth",
        horizon: "5",
        context: `Maybank: Limit 15k, Monthly 270 (0% EPP)\nAmbank: Limit 5k, Monthly 157\nsPayLater: Outstanding 5850 (High Interest!)\nCar Loan: Outstanding 75k, Paying RM800 (Official RM751)\nCurrent House: Renting RM950/mo`,
        specificQuestion: "Should I take the Maybank Balance Transfer Plan?",
        activeTags: ["Bad Debt", "Cash Surplus", "Car Lover"]
      }
    },
    fresh_grad: {
      label: "Fresh Grad Survival",
      icon: <GraduationCap size={16}/>,
      data: {
        salary: "3500",
        expenses: "2800",
        goalType: "debt_clearance",
        horizon: "10",
        context: `PTPTN: RM150/month\nCredit Card: RM2000 outstanding (min pay only)\nRent: RM600 (Room)\nSavings: RM500 total`,
        specificQuestion: "How do I save for a car deposit?",
        activeTags: ["Low Income", "PTPTN", "First Job"]
      }
    },
    family_man: {
      label: "Growing Family",
      icon: <Heart size={16}/>,
      data: {
        salary: "9000",
        expenses: "7000",
        goalType: "property_wealth",
        horizon: "20",
        context: `House Loan: RM2200\nCar 1: RM900\nCar 2: RM500\nChildcare: RM1200\nExpecting 2nd child soon.`,
        specificQuestion: "Can we afford to upgrade to a semi-D?",
        activeTags: ["Mortgage", "Kids", "Tight Flow"]
      }
    }
  };