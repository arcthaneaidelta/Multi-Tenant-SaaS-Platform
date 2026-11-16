import React, { useState } from 'react';
import {
  Zap,
  Sparkles,
  Database,
  Mail,
  MessageSquare,
  Play,
  CheckCircle2,
  Clock,
  ArrowRight,
  Info,
  RefreshCw,
} from 'lucide-react';

export const InteractiveWorkflow: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'New Lead Ingested',
      category: 'Trigger',
      icon: <Zap className="w-4 h-4 text-[#557C68]" />,
      summary: 'Captures webhook from website or inbound API.',
      payload: '{ "name": "Global Logistics Corp", "seats": 120, "budget": "$45,000", "urgency": "High" }',
      details: 'Evaluates payload structure, checks rate limits, and registers idempotent event ID.',
    },
    {
      id: 2,
      title: 'AI ICP Qualification',
      category: 'AI Copilot',
      icon: <Sparkles className="w-4 h-4 text-[#B89A68]" />,
      summary: 'GPT-4o computes lead score (94/100) and matches enterprise criteria.',
      payload: '{ "icp_fit": true, "lead_score": 94, "category": "Enterprise Tier", "estimated_ltv": "$140,000" }',
      details: 'Analyzes company domain against historical won deals and assesses budget compatibility.',
    },
    {
      id: 3,
      title: 'CRM Record Provisioning',
      category: 'Data Action',
      icon: <Database className="w-4 h-4 text-[#304F40]" />,
      summary: 'Creates company record, deal card, and tags account executive.',
      payload: '{ "deal_id": "DEAL-8841", "stage": "Qualified Lead", "owner": "Alex Mercer" }',
      details: 'Syncs bidirectionally with CRM lead tables and schedules follow-up cadence.',
    },
    {
      id: 4,
      title: 'Executive Follow-Up Email',
      category: 'Communication',
      icon: <Mail className="w-4 h-4 text-[#648B70]" />,
      summary: 'Sends personalized meeting link with customized product deck.',
      payload: '{ "template": "enterprise_intro_v2", "recipient": "vp.procurement@globallogistics.com" }',
      details: 'Appends calendar reservation slot and generates custom executive solution deck.',
    },
    {
      id: 5,
      title: 'Team Notification to Slack',
      category: 'Notification',
      icon: <MessageSquare className="w-4 h-4 text-[#557C68]" />,
      summary: 'Dispatches high-priority card to #enterprise-deals with quick actions.',
      payload: '{ "channel": "#enterprise-deals", "priority": "urgent", "status": "dispatched" }',
      details: 'Posts rich interactive card with one-click claim button for sales representatives.',
    },
  ];

  const [activeStepId, setActiveStepId] = useState<number>(2);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]);

  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];

  const handleSimulateRun = () => {
    setIsRunning(true);
    setCompletedSteps([]);
    let current = 1;

    const interval = setInterval(() => {
      setCompletedSteps((prev) => [...prev, current]);
      setActiveStepId(current);
      current++;

      if (current > steps.length) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E6EAE6] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E6EAE6]">
        <div>
          <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#557C68] bg-[#E7EEE8] px-2.5 py-0.5 rounded-full">
            LIVE WORKFLOW INTERACTION
          </span>
          <h3 className="text-xl font-bold font-display text-[#222B28] mt-1.5">
            Enterprise Inbound Lead Routing
          </h3>
          <p className="text-xs text-[#78817B] mt-0.5">
            Click any step below to inspect its execution payload, logic, and telemetry.
          </p>
        </div>

        <button
          onClick={handleSimulateRun}
          disabled={isRunning}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all ${
            isRunning
              ? 'bg-[#E7EEE8] text-[#78817B] cursor-not-allowed'
              : 'bg-[#304F40] hover:bg-[#557C68] text-white cursor-pointer'
          }`}
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Simulating Execution...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Pipeline Execution</span>
            </>
          )}
        </button>
      </div>

      {/* Connected workflow visual timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-6">
        {steps.map((s, idx) => {
          const isSelected = activeStepId === s.id;
          const isDone = completedSteps.includes(s.id);

          return (
            <button
              key={s.id}
              onClick={() => setActiveStepId(s.id)}
              className={`p-3 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'border-[#557C68] bg-[#F7F8F6] ring-1 ring-[#557C68]/40 shadow-xs'
                  : 'border-[#E6EAE6] bg-white hover:border-[#557C68]/50 hover:bg-[#F7F8F6]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-lg bg-[#E7EEE8] flex items-center justify-center">
                  {s.icon}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#648B70]" />
                ) : (
                  <span className="text-[10px] text-[#78817B] font-mono">0{s.id}</span>
                )}
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#78817B]">
                {s.category}
              </div>
              <div className="text-xs font-bold text-[#222B28] mt-0.5 leading-snug">
                {s.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Step Detail Inspector */}
      <div className="bg-[#F7F8F6] rounded-xl p-5 border border-[#E6EAE6]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-white border border-[#E6EAE6] flex items-center justify-center">
              {activeStep.icon}
            </span>
            <div>
              <h4 className="text-sm font-bold text-[#222B28] font-display">
                Step 0{activeStep.id}: {activeStep.title}
              </h4>
              <span className="text-[10px] font-mono text-[#78817B] uppercase">
                {activeStep.category} Module
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-[#648B70] bg-[#E7EEE8] px-2.5 py-0.5 rounded-full">
            Response Time: 64ms
          </span>
        </div>

        <p className="text-xs text-[#222B28] mb-3 leading-relaxed">
          {activeStep.details}
        </p>

        {/* Payload Box */}
        <div>
          <span className="text-[10px] font-mono uppercase font-bold text-[#78817B] mb-1 block">
            Payload Telemetry:
          </span>
          <pre className="p-3 rounded-lg bg-white border border-[#E6EAE6] text-[11px] font-mono text-[#304F40] overflow-x-auto">
            {activeStep.payload}
          </pre>
        </div>
      </div>
    </div>
  );
};
