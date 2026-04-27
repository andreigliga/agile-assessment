import { useState, useEffect, useRef } from "react";

const questions = [
  // SELF-ORGANIZATION (Andrei)
  {
    category: "Self-Organization",
    icon: "🧭",
    question: "When a blocker appears during a sprint, what does the team typically do?",
    options: [
      { text: "Wait for someone (SM, lead, manager) to resolve it", score: 1 },
      { text: "Flag it and hope someone picks it up", score: 2 },
      { text: "Try to resolve it themselves, escalate if they can't within a day", score: 3 },
      { text: "They jump on it together. Swarm, unblock, move on. Escalation is the last resort, not the first instinct", score: 4 },
    ],
  },
  {
    category: "Self-Organization",
    icon: "🧭",
    question: "If the Scrum Master doesn't show up for a week, what happens?",
    options: [
      { text: "Ceremonies get skipped, work becomes chaotic", score: 1 },
      { text: "Someone reluctantly fills in, but things feel off", score: 2 },
      { text: "The team runs everything, though some facilitation quality drops", score: 3 },
      { text: "Nobody notices. The rhythm is theirs, not the SM's", score: 4 },
    ],
  },
  {
    category: "Self-Organization",
    icon: "🧭",
    question: "How does the team decide who works on what?",
    options: [
      { text: "Work is assigned by a lead, PM, or SM", score: 1 },
      { text: "People pick tasks but wait for approval or direction", score: 2 },
      { text: "Team members self-assign based on skills and availability", score: 3 },
      { text: "The team collectively balances workload, pairs strategically, and redistributes when someone is stuck", score: 4 },
    ],
  },

  // CONTINUOUS IMPROVEMENT (Andrei)
  {
    category: "Continuous Improvement",
    icon: "🔄",
    question: "What happens with action items from retrospectives?",
    options: [
      { text: "We don't track them or follow through consistently", score: 1 },
      { text: "We write them down but most get forgotten by next sprint", score: 2 },
      { text: "We track and complete most of them", score: 3 },
      { text: "Action items are owned, tracked, and the team holds itself accountable without being reminded", score: 4 },
    ],
  },
  {
    category: "Continuous Improvement",
    icon: "🔄",
    question: "When a process clearly isn't working, who raises it first?",
    options: [
      { text: "Usually the SM during retrospective", score: 1 },
      { text: "One or two vocal people, but most stay quiet", score: 2 },
      { text: "Multiple team members bring it up in different settings", score: 3 },
      { text: "The team experiments with fixes before it even becomes a formal discussion", score: 4 },
    ],
  },
  {
    category: "Continuous Improvement",
    icon: "🔄",
    question: "How does the team respond to failure (missed sprint goal, production incident, bad release)?",
    options: [
      { text: "Blame, defensiveness, or silence", score: 1 },
      { text: "Post-mortem happens but feels like a formality", score: 2 },
      { text: "Genuine reflection happens, lessons are discussed", score: 3 },
      { text: "Failure is just data. They adjust fast, write down what they learned, and change something before the next sprint starts", score: 4 },
    ],
  },

  // DELIVERY PREDICTABILITY (Tom + Andrei)
  {
    category: "Delivery Predictability",
    icon: "📊",
    question: "How often does the team deliver what they committed to for the sprint?",
    options: [
      { text: "Rarely. Commitments feel arbitrary", score: 1 },
      { text: "Sometimes, but it varies wildly sprint to sprint", score: 2 },
      { text: "Most sprints they hit 70-80% of commitments", score: 3 },
      { text: "Consistently above 80%. Stakeholders actually trust their forecasts", score: 4 },
    ],
  },
  {
    category: "Delivery Predictability",
    icon: "📊",
    question: "How does the team handle scope changes mid-sprint?",
    options: [
      { text: "They accept everything and hope for the best", score: 1 },
      { text: "The SM pushes back on their behalf", score: 2 },
      { text: "The team discusses trade-offs but sometimes caves under stakeholder pressure", score: 3 },
      { text: "The team negotiates confidently. They protect sprint goals and come back with alternatives, not excuses", score: 4 },
    ],
  },
  {
    category: "Delivery Predictability",
    icon: "📊",
    question: "Does the team use data to plan and forecast?",
    options: [
      { text: "No. Planning is based on gut feeling or pressure from above", score: 1 },
      { text: "Some metrics exist but aren't used in decision-making", score: 2 },
      { text: "Velocity or throughput is tracked and referenced during planning", score: 3 },
      { text: "They use cycle time, throughput, and historical data to forecast. They own their metrics, not the other way around", score: 4 },
    ],
  },

  // CONFLICT RESOLUTION (Andrei)
  {
    category: "Conflict Resolution",
    icon: "⚖️",
    question: "When two team members disagree on a technical approach, what happens?",
    options: [
      { text: "It turns personal, or one person dominates and the other withdraws", score: 1 },
      { text: "The SM or a lead mediates", score: 2 },
      { text: "They debate it out, usually reach a compromise", score: 3 },
      { text: "They use data, run experiments, or timebox a spike. Disagreement stays productive, never personal", score: 4 },
    ],
  },
  {
    category: "Conflict Resolution",
    icon: "⚖️",
    question: "When someone consistently underperforms or misses commitments, how does the team respond?",
    options: [
      { text: "Nobody says anything. It's the manager's job", score: 1 },
      { text: "People complain privately but avoid the direct conversation", score: 2 },
      { text: "Someone eventually raises it, usually in retro", score: 3 },
      { text: "The team addresses it directly and supportively. They hold each other accountable because they actually care", score: 4 },
    ],
  },
  {
    category: "Conflict Resolution",
    icon: "⚖️",
    question: "How does the team handle disagreements with the Product Owner on priorities?",
    options: [
      { text: "They don't. PO decides, team executes", score: 1 },
      { text: "SM advocates for the team's concerns", score: 2 },
      { text: "Team members voice opinions but usually defer to PO", score: 3 },
      { text: "Healthy push-back is normal. They challenge priorities with data and customer insight, not just opinions", score: 4 },
    ],
  },

  // STAKEHOLDER COMMUNICATION (Andrei)
  {
    category: "Stakeholder Communication",
    icon: "🤝",
    question: "Who communicates progress and risks to stakeholders?",
    options: [
      { text: "Almost exclusively the SM or project manager", score: 1 },
      { text: "SM handles most of it, team presents at sprint reviews", score: 2 },
      { text: "Team members engage directly but still lean on SM for difficult conversations", score: 3 },
      { text: "Team members have direct, trusted relationships with stakeholders. Communication flows both ways without anyone brokering it", score: 4 },
    ],
  },
  {
    category: "Stakeholder Communication",
    icon: "🤝",
    question: "During sprint review, who drives the conversation?",
    options: [
      { text: "The SM presents everything", score: 1 },
      { text: "The SM facilitates, team demos when prompted", score: 2 },
      { text: "Team members demo their own work and handle questions", score: 3 },
      { text: "The team owns the entire review. They tell the story of what was delivered, gather feedback, and adapt on the spot", score: 4 },
    ],
  },
  {
    category: "Stakeholder Communication",
    icon: "🤝",
    question: "How transparent is the team about problems and delays?",
    options: [
      { text: "Problems are hidden or minimized until they explode", score: 1 },
      { text: "SM raises risks; team prefers to fix things quietly", score: 2 },
      { text: "The team is fairly open about challenges when asked", score: 3 },
      { text: "Full transparency. The team raises risks before anyone has to ask", score: 4 },
    ],
  },

  // OWNERSHIP & ACCOUNTABILITY (Andrei)
  {
    category: "Ownership & Accountability",
    icon: "🔥",
    question: "When something breaks in production, what's the team's immediate reaction?",
    options: [
      { text: "Finger-pointing or waiting for someone to assign the fix", score: 1 },
      { text: "They look to a lead or SM to coordinate the response", score: 2 },
      { text: "They rally together but still need someone directing efforts", score: 3 },
      { text: "They swarm immediately, own the fix, communicate status, and run their own post-mortem", score: 4 },
    ],
  },
  {
    category: "Ownership & Accountability",
    icon: "🔥",
    question: "How does the team view their own process (standups, planning, retros)?",
    options: [
      { text: "Ceremonies feel imposed on them. Just overhead", score: 1 },
      { text: "They participate because they have to", score: 2 },
      { text: "They see value and engage meaningfully most of the time", score: 3 },
      { text: "They designed their own process and keep evolving it. It's theirs, not something prescribed to them", score: 4 },
    ],
  },
  {
    category: "Ownership & Accountability",
    icon: "🔥",
    question: "Who sets the sprint goal?",
    options: [
      { text: "The PO or SM tells the team what the goal is", score: 1 },
      { text: "The PO proposes it, team accepts without much discussion", score: 2 },
      { text: "PO and team collaborate on the goal during planning", score: 3 },
      { text: "The team shapes the sprint goal. They understand the why and commit because they own the outcome, not because someone told them to", score: 4 },
    ],
  },

  // PSYCHOLOGICAL SAFETY (Andrei)
  {
    category: "Psychological Safety",
    icon: "🛡️",
    question: "Can team members say \"I don't know\" or \"I need help\" without consequences?",
    options: [
      { text: "No. Admitting weakness feels risky", score: 1 },
      { text: "Some people can, but it depends on who you are in the team", score: 2 },
      { text: "Generally yes, though it's easier in 1-on-1s than in group settings", score: 3 },
      { text: "Yes, completely. Vulnerability is normal here. Asking for help is seen as strength, not weakness", score: 4 },
    ],
  },
  {
    category: "Psychological Safety",
    icon: "🛡️",
    question: "When someone makes a mistake, what's the typical team response?",
    options: [
      { text: "Blame, frustration, or the person gets singled out", score: 1 },
      { text: "It's tolerated but the person feels bad. There's an unspoken cost to messing up", score: 2 },
      { text: "The team is understanding and focuses on fixing the issue", score: 3 },
      { text: "Mistakes are just data. The question is always \"what can we improve in our system\" not \"who did this\"", score: 4 },
    ],
  },
  {
    category: "Psychological Safety",
    icon: "🛡️",
    question: "How comfortable are junior or quieter team members in challenging senior opinions?",
    options: [
      { text: "They don't. Hierarchy is real even if nobody talks about it", score: 1 },
      { text: "Rarely, and only if they're very confident", score: 2 },
      { text: "It happens sometimes, especially in retros where it feels safer", score: 3 },
      { text: "Seniority doesn't determine who speaks. Ideas get evaluated on merit and everyone's voice carries the same weight", score: 4 },
    ],
  },

  // TECHNICAL PRACTICES (Tom)
  {
    category: "Technical Practices",
    icon: "⚙️",
    question: "How does the team approach code quality and technical debt?",
    options: [
      { text: "Tech debt piles up. There's never time or a plan to deal with it", score: 1 },
      { text: "It's acknowledged but consistently deprioritized in favor of features", score: 2 },
      { text: "The team allocates some capacity for tech debt each sprint", score: 3 },
      { text: "Quality is built in. The team maintains code health proactively and pushes back on shortcuts that create debt", score: 4 },
    ],
  },
  {
    category: "Technical Practices",
    icon: "⚙️",
    question: "What does the team's testing and CI/CD practice look like?",
    options: [
      { text: "Manual testing, irregular deployments, things break often", score: 1 },
      { text: "Some automated tests exist but coverage is low and deployments are stressful", score: 2 },
      { text: "Reasonable test coverage and regular deployments with some manual gates", score: 3 },
      { text: "Comprehensive automated testing, continuous deployment, and the team deploys with confidence multiple times per sprint", score: 4 },
    ],
  },
  {
    category: "Technical Practices",
    icon: "⚙️",
    question: "How does the team share technical knowledge?",
    options: [
      { text: "Knowledge lives in people's heads. Bus factor is 1 on most areas", score: 1 },
      { text: "Some documentation exists but it's outdated and incomplete", score: 2 },
      { text: "Code reviews, occasional knowledge sharing sessions, decent documentation", score: 3 },
      { text: "Active pairing, thorough reviews, living documentation. No single point of failure anywhere", score: 4 },
    ],
  },
];

const categories = [
  "Self-Organization", "Continuous Improvement", "Delivery Predictability",
  "Conflict Resolution", "Stakeholder Communication", "Ownership & Accountability",
  "Psychological Safety", "Technical Practices",
];

const categoryExperts = {
  "Self-Organization": "andrei",
  "Continuous Improvement": "andrei",
  "Delivery Predictability": "both",
  "Conflict Resolution": "andrei",
  "Stakeholder Communication": "andrei",
  "Ownership & Accountability": "andrei",
  "Psychological Safety": "andrei",
  "Technical Practices": "tom",
};

const categoryInsights = {
  "Self-Organization": {
    high: "Your team operates autonomously. They don't need someone telling them what to do. They figure it out, fast. This is what real agility looks like.",
    mid: "The team can function on their own, but still defaults to waiting for direction when things get ambiguous. The instinct to self-organize is there but not yet automatic.",
    low: "The team depends heavily on external direction. Without someone guiding daily work, momentum drops. This isn't a failure. It's actually the most common starting point.",
    highAction: "Protect this autonomy. Don't add unnecessary process. If anything, reduce ceremonies and let the team find their own rhythm.",
    midAction: "Start by stepping back from one ceremony per sprint. Let the team run their own standups for 2 weeks and observe what happens.",
    lowAction: "Begin with small, safe decisions the team can own. Let them choose which tasks to pick first or how to organize their board. Build the muscle gradually.",
  },
  "Continuous Improvement": {
    high: "This team drives their own evolution. They don't wait for someone to tell them something's broken. They experiment, iterate, and improve on their own.",
    mid: "Improvement happens, but it needs prompting. Retros generate ideas, but follow-through is inconsistent. The team knows what needs to change but struggles to sustain momentum.",
    low: "Improvement is sporadic or entirely driven by the SM. Without someone pushing for change, the team defaults to the status quo.",
    highAction: "Challenge the team with bigger improvement goals. They're ready for process experiments that could transform how they work.",
    midAction: "Make retro action items visible. Put them on the board, assign owners, review progress weekly. Accountability is the missing piece.",
    lowAction: "Start with one experiment per sprint. One. Make it small, measurable, and celebrate when it works. Build the habit before scaling it.",
  },
  "Delivery Predictability": {
    high: "Stakeholders trust this team's commitments. They forecast with data, protect their goals, and deliver consistently. This is rare and incredibly valuable.",
    mid: "Delivery is somewhat consistent but still has notable variance. The team struggles with scope creep, estimation accuracy, or both.",
    low: "Delivery is unpredictable. Commitments are regularly missed or feel arbitrary. This isn't about working harder. It's about making work visible and building a feedback loop.",
    highAction: "Introduce forecasting techniques like Monte Carlo simulation. Help stakeholders understand probabilistic delivery timelines.",
    midAction: "Focus on two things: visible WIP limits and tracking scope changes. Most predictability problems live in those two areas.",
    lowAction: "Go back to basics: smaller work items, clearer sprint goals, and a daily check on whether the team is on track.",
  },
  "Conflict Resolution": {
    high: "Disagreements here are productive, not destructive. The team uses tension as fuel for better decisions. This is a sign of deep maturity.",
    mid: "Conflicts get resolved but it takes effort, and often someone needs to facilitate. Some tension goes unaddressed until it becomes bigger.",
    low: "Conflicts either escalate or get buried. Neither is healthy. The team lacks the tools or safety to navigate disagreements constructively.",
    highAction: "Introduce structured decision-making frameworks for complex trade-offs. The team is ready for sophisticated approaches.",
    midAction: "Build a simple conflict protocol: when you disagree, first try data, then try a timebox experiment, then escalate.",
    lowAction: "Start with psychological safety work before touching conflict directly. People can't disagree productively if they don't feel safe.",
  },
  "Stakeholder Communication": {
    high: "Direct, trusted communication channels exist between team and stakeholders. The SM isn't a bottleneck. Information flows naturally.",
    mid: "The team engages with stakeholders but still routes difficult or political conversations through the SM.",
    low: "The SM is the primary communication interface. The team is either shielded from or uncomfortable with direct stakeholder interaction.",
    highAction: "The team is ready to own stakeholder relationships entirely. Shift the SM to strategic advisory, not day-to-day communication.",
    midAction: "Start pairing team members with stakeholders on specific topics. Give individuals ownership of communication channels.",
    lowAction: "Begin by having team members present their own work in sprint reviews. Build comfort gradually before introducing direct conversations.",
  },
  "Ownership & Accountability": {
    high: "This team owns their work, their process, and their outcomes. They don't wait for permission to improve things. This is real maturity.",
    mid: "Ownership exists but it's uneven. A few people carry the weight while the rest wait to be told.",
    low: "Process feels imposed, not owned. The team executes what's asked but doesn't feel responsible for outcomes beyond individual tasks.",
    highAction: "Give the team even more autonomy. Let them set their own OKRs, define their Definition of Done, choose their own tools.",
    midAction: "Rotate facilitation of ceremonies. Let different people own different aspects of the process. Distribute leadership.",
    lowAction: "Involve the team in designing their own process. Ask them: 'If you could change one thing about how we work, what would it be?'",
  },
  "Psychological Safety": {
    high: "People here can be vulnerable, make mistakes, and challenge each other without fear. This is the hardest thing to build and the most valuable.",
    mid: "There's a baseline of safety, but it's fragile. It works in some contexts but breaks down under pressure or when certain personalities dominate.",
    low: "People don't feel safe being honest. Mistakes are punished, questions are judged, and dissent is silent. This is the root cause of most other maturity problems.",
    highAction: "Model and reinforce. Safety isn't permanent. It needs active maintenance. Keep creating spaces for honest conversation.",
    midAction: "Identify where safety breaks down. Is it in certain meetings? With certain people? In high-pressure moments? Target those specific contexts.",
    lowAction: "This requires dedicated coaching work, not just process changes. Building safety starts with leadership behavior.",
  },
  "Technical Practices": {
    high: "Quality is built in, not bolted on. Strong engineering discipline across the board: automated testing, continuous deployment, minimal tech debt.",
    mid: "Engineering practices are decent but inconsistent. Some areas have good coverage, others are fragile. Deployments work but aren't stress-free.",
    low: "Significant gaps in engineering fundamentals. Limited automation, manual testing, high tech debt, fear of deploying.",
    highAction: "Challenge the team with advanced practices: trunk-based development, feature flags, canary deployments.",
    midAction: "Focus on the highest-impact gap: is it test coverage, deployment pipeline, or tech debt? Pick one and invest a sprint.",
    lowAction: "Start with the basics: automated build pipeline, basic unit tests on critical paths, and a plan to address the top 3 tech debt items.",
  },
};

function getVerdict(pct) {
  if (pct >= 85) return { level: "Autonomous", emoji: "🟢", color: "#059669", bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", border: "#a7f3d0", message: "This team is ready to operate without a dedicated Scrum Master.", detail: "They've internalized Agile principles and built strong habits across all dimensions. The SM role should transition to coaching-on-demand. Available when needed, not embedded daily.", next: "Transition from embedded SM to periodic coaching sessions. The team has earned autonomy." };
  if (pct >= 70) return { level: "Maturing", emoji: "🟡", color: "#d97706", bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "#fde68a", message: "Almost there. Strong foundation, but gaps remain.", detail: "Solid fundamentals and real Agile habits. But specific areas still need SM support. The SM should shift from doing to coaching: more questions, fewer answers.", next: "Focus coaching energy on the 1-2 weakest dimensions. The team is close." };
  if (pct >= 50) return { level: "Developing", emoji: "🟠", color: "#ea580c", bg: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)", border: "#fed7aa", message: "Growing, but still needs active SM support.", detail: "Awareness of Agile principles exists but execution is inconsistent. The team reverts to old habits under pressure. Removing the SM now would cause regression.", next: "Pick 2-3 areas and make them rock solid before expanding. Depth over breadth." };
  if (pct >= 35) return { level: "Forming", emoji: "🔴", color: "#dc2626", bg: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)", border: "#fecaca", message: "This team needs their Scrum Master. Actively.", detail: "Without the SM, ceremonies would degrade, blockers would pile up, and delivery would become reactive. The foundation needs deliberate building.", next: "Prioritize fundamentals: consistent ceremonies, visible work, clear sprint goals." };
  return { level: "Dependent", emoji: "🟣", color: "#7c3aed", bg: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)", border: "#ddd6fe", message: "Significant coaching investment needed.", detail: "The team is reacting rather than planning, avoiding conflict rather than resolving it, and depending heavily on individuals rather than systems.", next: "Start with psychological safety and basic Scrum fundamentals. Everything else builds on those." };
}

function CategoryBar({ category, icon, score, max, expert }) {
  const pct = Math.round((score / max) * 100);
  const expertLabel = expert === "andrei" ? "Andrei Gliga" : expert === "tom" ? "Tom Hill" : "Andrei & Tom";
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>{icon} {category}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: pct >= 75 ? "#059669" : pct >= 50 ? "#d97706" : "#dc2626", fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ width: "100%", height: "10px", backgroundColor: "#e2e8f0", borderRadius: "5px", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: pct >= 75 ? "linear-gradient(90deg, #059669, #34d399)" : pct >= 50 ? "linear-gradient(90deg, #d97706, #fbbf24)" : "linear-gradient(90deg, #dc2626, #f87171)", borderRadius: "5px", transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)" }} />
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Specialist: {expertLabel}</div>
    </div>
  );
}

export default function AgileMaturityV2() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fadeIn, setFadeIn] = useState(true);
  const [email, setEmail] = useState("");
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Fraunces:wght@700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentQ, showResults]);

  const handleAnswer = (qi, score) => {
    setSelectedOption(score);
    setTimeout(() => {
      setFadeIn(false);
      setTimeout(() => {
        const na = { ...answers, [qi]: score };
        setAnswers(na);
        setSelectedOption(null);
        if (qi === questions.length - 1) setShowResults(true);
        else setCurrentQ(qi + 1);
        setFadeIn(true);
      }, 200);
    }, 350);
  };

  const totalScore = Object.values(answers).reduce((s, v) => s + v, 0);
  const maxScore = questions.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const verdict = getVerdict(percentage);

  const categoryScores = categories.map((cat) => {
    const qs = questions.filter((q) => q.category === cat);
    const sc = qs.reduce((s, q) => s + (answers[questions.indexOf(q)] || 0), 0);
    return { category: cat, icon: qs[0].icon, score: sc, max: qs.length * 4, expert: categoryExperts[cat] };
  });

  const sorted = [...categoryScores].sort((a, b) => (b.score / b.max) - (a.score / a.max));
  const strengths = sorted.slice(0, 2);
  const weaknesses = sorted.slice(-2).reverse();

  const reset = () => { setAnswers({}); setCurrentQ(0); setShowResults(false); setSelectedOption(null); setFadeIn(true); setStarted(false); setEmail(""); setEmailUnlocked(false); setEmailSending(false); };

  const sendResults = async () => {
    if (!email.includes("@") || emailSending) return;
    setEmailSending(true);
    setEmailUnlocked(true);
    try {
      const scores = categoryScores.map(c => ({
        category: c.category,
        icon: c.icon,
        pct: Math.round((c.score / c.max) * 100)
      }));
      await fetch("/api/send-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          scores,
          overallPct: percentage,
          verdict: verdict.level + " - " + verdict.message
        })
      });
    } catch (e) {
      console.error("Failed to send email:", e);
    }
    setEmailSending(false);
  };

  const cs = { minHeight: "100vh", background: "#0f172a", padding: "24px 16px", fontFamily: "'DM Sans', sans-serif" };
  const card = { background: "rgba(30,41,59,0.8)", backdropFilter: "blur(12px)", borderRadius: "16px", border: "1px solid rgba(148,163,184,0.1)", padding: "24px", marginBottom: "20px" };
  const label = { fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b", marginBottom: "16px", display: "block" };

  if (showResults) {
    return (
      <div style={cs}><div ref={topRef} style={{ maxWidth: "680px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "32px", paddingTop: "16px" }}>
          <span style={label}>Assessment Complete · {questions.length} Questions Analyzed</span>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "32px", fontWeight: 900, color: "#f8fafc", margin: 0 }}>Team Maturity Report</h1>
        </div>

        <div style={{ ...card, background: verdict.bg, border: `2px solid ${verdict.border}`, textAlign: "center", padding: "40px 24px" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "72px", fontWeight: 700, color: verdict.color, lineHeight: 1 }}>{percentage}%</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: verdict.color, margin: "8px 0 20px 0", opacity: 0.8 }}>{verdict.emoji} {verdict.level}</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", fontWeight: 800, color: "#0f172a", margin: "0 0 12px 0", lineHeight: 1.3 }}>{verdict.message}</h2>
          <p style={{ color: "#334155", fontSize: "14px", lineHeight: 1.7, margin: "0 0 20px 0" }}>{verdict.detail}</p>
          <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: "10px", padding: "16px", textAlign: "left" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#64748b" }}>Recommended next step</span>
            <p style={{ color: "#0f172a", fontSize: "14px", lineHeight: 1.6, margin: "8px 0 0 0", fontWeight: 500 }}>{verdict.next}</p>
          </div>
        </div>

        <div style={card}>
          <span style={{ ...label, color: "#64748b" }}>Breakdown by Dimension</span>
          {categoryScores.map((c) => <CategoryBar key={c.category} {...c} />)}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div style={{ ...card, marginBottom: 0, borderLeft: "3px solid #34d399" }}>
            <span style={{ ...label, color: "#34d399" }}>Top Strengths</span>
            {strengths.map((s) => <div key={s.category} style={{ marginBottom: "10px" }}><div style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600 }}>{s.icon} {s.category}</div><div style={{ color: "#94a3b8", fontSize: "12px" }}>{Math.round((s.score / s.max) * 100)}%</div></div>)}
          </div>
          <div style={{ ...card, marginBottom: 0, borderLeft: "3px solid #f87171" }}>
            <span style={{ ...label, color: "#f87171" }}>Priority Improvements</span>
            {weaknesses.map((w) => <div key={w.category} style={{ marginBottom: "10px" }}><div style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600 }}>{w.icon} {w.category}</div><div style={{ color: "#94a3b8", fontSize: "12px" }}>{Math.round((w.score / w.max) * 100)}%</div></div>)}
          </div>
        </div>

        <div style={card}>
          <span style={{ ...label, color: "#64748b" }}>Detailed Insights</span>
          {categoryScores.map((c) => {
            const pct = Math.round((c.score / c.max) * 100);
            const lv = pct >= 75 ? "high" : pct >= 50 ? "mid" : "low";
            const ins = categoryInsights[c.category];
            const exp = categoryExperts[c.category];
            const en = exp === "andrei" ? "Andrei Gliga" : exp === "tom" ? "Tom Hill" : "Andrei Gliga & Tom Hill";
            const er = exp === "andrei" ? "team dynamics, facilitation, and coaching" : exp === "tom" ? "engineering practices and technical leadership" : "delivery strategy and organizational alignment";
            return (
              <div key={c.category} style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid rgba(148,163,184,0.1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ color: "#e2e8f0", fontSize: "15px", fontWeight: 700 }}>{c.icon} {c.category}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 600, color: pct >= 75 ? "#34d399" : pct >= 50 ? "#fbbf24" : "#f87171", background: pct >= 75 ? "rgba(52,211,153,0.1)" : pct >= 50 ? "rgba(251,191,36,0.1)" : "rgba(248,113,113,0.1)", padding: "2px 10px", borderRadius: "12px" }}>{pct}%</span>
                </div>
                <p style={{ color: "#cbd5e1", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>{ins[lv]}</p>
                {emailUnlocked && (
                  <div style={{ background: "rgba(15,23,42,0.5)", borderRadius: "10px", padding: "14px", borderLeft: "3px solid #3b82f6", marginTop: "12px" }}>
                    <div style={{ color: "#93c5fd", fontSize: "11px", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>Action Step</div>
                    <p style={{ color: "#e2e8f0", fontSize: "13px", lineHeight: 1.6, margin: "0 0 8px 0" }}>{ins[lv + "Action"]}</p>
                    <p style={{ color: "#64748b", fontSize: "12px", margin: 0, fontStyle: "italic" }}>This is where <strong style={{ color: "#93c5fd" }}>{en}</strong> specializes in {er}.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!emailUnlocked && (
          <div style={{ ...card, textAlign: "center", background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.08))", border: "1px solid rgba(59,130,246,0.2)" }}>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 800, color: "#f8fafc", margin: "0 0 8px 0" }}>Get your action plan</h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.6, margin: "0 0 24px 0" }}>Unlock specific action steps for each dimension, tailored to your scores.</p>
            <div style={{ display: "flex", gap: "8px", maxWidth: "400px", margin: "0 auto" }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendResults(); }}
                style={{ flex: 1, padding: "14px 16px", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(148,163,184,0.2)", borderRadius: "10px", color: "#f8fafc", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none" }}
              />
              <button
                onClick={sendResults}
                style={{ padding: "14px 24px", background: email.includes("@") ? "#3b82f6" : "#1e293b", color: email.includes("@") ? "#fff" : "#475569", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: email.includes("@") ? "pointer" : "default", transition: "all 0.2s ease" }}
              >{emailSending ? "Sending..." : "Unlock"}</button>
            </div>
            <p style={{ color: "#475569", fontSize: "11px", marginTop: "12px" }}>No spam. Just your personalized action steps.</p>
          </div>
        )}

        <div style={{ ...card, textAlign: "center", background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.15))", border: "1px solid rgba(59,130,246,0.3)" }}>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 800, color: "#f8fafc", margin: "0 0 8px 0" }}>Want to accelerate your team's maturity?</h3>
          <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.6, margin: "0 0 20px 0" }}>We work with engineering teams to build autonomy, delivery predictability, and sustainable performance. From diagnostic to implementation.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://hillgliga.com" target="_blank" rel="noopener noreferrer" style={{ padding: "14px 28px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", textDecoration: "none", display: "inline-block" }}>Book a Free Consultation</a>
            <button onClick={reset} style={{ padding: "14px 28px", background: "transparent", color: "#94a3b8", border: "1px solid rgba(148,163,184,0.3)", borderRadius: "10px", fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>Retake Assessment</button>
          </div>
        </div>

        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#475569", margin: 0 }}>Built by Hill + Gliga · Agile & Engineering Advisory</p>
        </div>
      </div></div>
    );
  }

  const q = questions[currentQ];
  const progress = (currentQ / questions.length) * 100;

  return (
    <div style={cs}><div ref={topRef} style={{ maxWidth: "680px", margin: "0 auto" }}>
      {!started ? (
        <div style={{ textAlign: "center", paddingTop: "48px" }}>
          <span style={label}>Hill + Gliga · Agile & Engineering Advisory</span>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "36px", fontWeight: 900, color: "#f8fafc", margin: "0 0 16px 0", lineHeight: 1.15 }}>Is your team ready<br />to ditch their<br />Scrum Master?</h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 40px auto" }}>{questions.length} questions across {categories.length} dimensions of team maturity. One honest assessment of how autonomous your team really is.</p>
          <button onClick={() => setStarted(true)} style={{ padding: "16px 48px", background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "#fff", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", boxShadow: "0 4px 24px rgba(59,130,246,0.3)" }}>Start Assessment</button>
          <div style={{ ...card, marginTop: "48px", textAlign: "left" }}>
            <span style={{ ...label, color: "#64748b" }}>What We Measure</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {categories.map((cat) => {
                const ic = questions.find((q) => q.category === cat)?.icon;
                return <div key={cat} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: "rgba(15,23,42,0.5)", borderRadius: "8px" }}><span style={{ fontSize: "18px" }}>{ic}</span><span style={{ fontSize: "13px", fontWeight: 500, color: "#cbd5e1" }}>{cat}</span></div>;
              })}
            </div>
          </div>
          <div style={{ ...card, textAlign: "left", marginTop: 0 }}>
            <span style={{ ...label, color: "#64748b" }}>Who Built This</span>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>Andrei Gliga</div>
                <div style={{ color: "#94a3b8", fontSize: "12px", lineHeight: 1.5 }}>Agile Coach · 8+ years, 35+ teams across 3 continents. Team dynamics, facilitation, and building autonomous teams.</div>
              </div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>Tom Hill</div>
                <div style={{ color: "#94a3b8", fontSize: "12px", lineHeight: 1.5 }}>Engineering Leader · Technical leadership, delivery strategy, and high-performing engineering organizations.</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ opacity: fadeIn ? 1 : 0, transition: "opacity 0.2s ease", paddingTop: "16px" }}>
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ ...label, marginBottom: 0 }}>{q.icon} {q.category}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#64748b" }}>{currentQ + 1} / {questions.length}</span>
            </div>
            <div style={{ width: "100%", height: "4px", backgroundColor: "rgba(148,163,184,0.15)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #3b82f6, #6366f1)", borderRadius: "2px", transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }} />
            </div>
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", fontWeight: 800, color: "#f8fafc", margin: "0 0 28px 0", lineHeight: 1.35 }}>{q.question}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(currentQ, opt.score)} style={{
                padding: "18px 20px",
                backgroundColor: selectedOption === opt.score ? "#3b82f6" : "rgba(30,41,59,0.8)",
                color: selectedOption === opt.score ? "#fff" : "#cbd5e1",
                border: selectedOption === opt.score ? "1px solid #3b82f6" : "1px solid rgba(148,163,184,0.15)",
                borderRadius: "12px", fontSize: "14px", fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer", textAlign: "left", lineHeight: 1.5, transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => { if (selectedOption !== opt.score) { e.target.style.borderColor = "rgba(59,130,246,0.5)"; e.target.style.backgroundColor = "rgba(30,41,59,1)"; } }}
              onMouseLeave={(e) => { if (selectedOption !== opt.score) { e.target.style.borderColor = "rgba(148,163,184,0.15)"; e.target.style.backgroundColor = "rgba(30,41,59,0.8)"; } }}
              >{opt.text}</button>
            ))}
          </div>
        </div>
      )}
    </div></div>
  );
}
