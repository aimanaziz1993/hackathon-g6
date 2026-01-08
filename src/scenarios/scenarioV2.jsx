// Scenario V2: Added human psychology triggers
import { 
  Bot, AlertTriangle, TrendingUp, Home, 
  DollarSign, Activity, ChevronDown, ChevronUp, 
  FileText, Key, Loader2, ShieldCheck, 
  Zap, Brain, Heart, GraduationCap, Briefcase, Terminal, Cpu
} from 'lucide-react';

export const ScenariosComponentV2 = {
    high_earner: {
      label: "The High Earner Trap",
      icon: <Briefcase size={16}/>,
      data: {
        salary: "7400",
        expenses: "4200",
        goalType: "property_wealth",
        horizon: "5",
        // PSYCHOLOGY TRIGGER: "Lifestyle Creep" & "Status Anxiety"
        context: `I feel stuck. I earn good money (RM7.4k) but I have zero savings at the end of the month.
  I drive a Honda Civic (paying RM800/mo) which I love, but the loan is dragging on.
  I have 3 Credit Cards:
  - Maybank (RM270/mo)
  - Ambank (RM157/mo)
  - CIMB (RM200/mo)
  I also use Shopee sPayLater (RM5k outstanding) because it's easy, but the interest is killing me.
  I want to buy a house but I keep spending my surplus on gadgets and dining out. Help me fix my habits.`,
        specificQuestion: "Should I take the Maybank Balance Transfer Plan to lower my commitments?",
        activeTags: ["Bad Debt", "Cash Surplus", "Car Lover"]
      }
    },
    fresh_grad: {
      label: "Fresh Grad Survival",
      icon: <GraduationCap size={16}/>,
      data: {
        salary: "3500",
        expenses: "3100",
        goalType: "debt_clearance",
        horizon: "10",
        // PSYCHOLOGY TRIGGER: "Survival Mode" & "Scarcity Mindset"
        context: `Just started my first job. PTPTN is deducting RM150/month auto-debit.
  I'm renting a room for RM600.
  I have a Credit Card with RM2,000 outstanding because I had to buy a laptop for work, and I'm only paying the minimum amount every month.
  I'm scared of investing because I don't have an emergency fund yet (only RM500 in bank).
  I eat economy rice every day to save money.`,
        specificQuestion: "How do I clear my credit card and save for a car deposit?",
        activeTags: ["Low Income", "PTPTN", "First Job"]
      }
    },
    family_man: {
      label: "The Overextended Dad",
      icon: <Heart size={16}/>,
      data: {
        salary: "12000",
        expenses: "11500",
        goalType: "property_wealth",
        horizon: "20",
        // PSYCHOLOGY TRIGGER: "Sandwich Generation" & "Overleveraged"
        context: `Household income is high (RM12k) but we are bleeding cash.
  Commitments:
  - Home Loan: RM2,800 (Condo)
  - Car 1 (SUV): RM1,400
  - Car 2 (Myvi): RM600
  - Childcare: RM2,200 (2 kids)
  - Parents Allowance: RM1,000
  We want to upgrade to a Landed House because the condo is too small, but banks say my DSR is too high.
  We put everything on credit cards to collect points but sometimes forget to pay full.`,
        specificQuestion: "Can we actually afford a RM800k semi-D or are we dreaming?",
        activeTags: ["Mortgage", "Kids", "Tight Flow"]
      }
    }
  };