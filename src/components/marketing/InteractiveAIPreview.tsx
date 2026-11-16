import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Check, RefreshCw, Cpu } from 'lucide-react';

export const InteractiveAIPreview: React.FC = () => {
  const predefinedAnswers: Record<string, string> = {
    'Summarize latest business activity':
      'Across all active workspaces, inbound enterprise pipeline increased by 18% this week. Acme Technologies processed 1,248 automations with 99.4% uptime. Storage utilization is healthy across all 5 active tenant partitions.',
    'Identify opportunities in our CRM':
      'Identified 6 high-value accounts ($120k+ ARR) currently idling in the "Technical Review" stage for over 5 days. Recommended automated outreach workflow has been generated to accelerate deal closure.',
    'Create an automation workflow':
      'Drafted a 4-step workflow: Inbound Webhook -> AI ICP Lead Scoring -> Condition (Score > 85) -> Slack Team Alert & HubSpot Deal Creation. Ready for one-click deployment.',
    'Analyze workspace performance':
      'Average edge API response latency is 18ms across all regions. AI token consumption is operating at 49.6% of allocated tenant quotas. Zero authorization errors recorded in the last 24 hours.',
  };

  const defaultPrompts = [
    'Summarize latest business activity',
    'Identify opportunities in our CRM',
    'Create an automation workflow',
    'Analyze workspace performance',
  ];

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Hello. I am VELORA Copilot. I analyze cross-tenant workflows, synthesize CRM metrics, and build automations. Click a sample prompt below or ask a question.',
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || isThinking) return;

    setMessages((prev) => [...prev, { role: 'user', text: textToSend }]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      // Find matching simulated answer or intelligent fallback
      let answer = predefinedAnswers[textToSend];
      if (!answer) {
        answer = `Simulated Intelligence: Analyzed "${textToSend}". Workspace telemetry shows all systems operational, 6 active modules connected, and data isolation verified across all 5 tenant databases.`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
      setIsThinking(false);
    }, 700);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-sm flex flex-col h-[460px]">
      <div className="flex items-center justify-between pb-4 border-b border-[#E6EAE6] mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E7EEE8] text-[#304F40] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#557C68]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#222B28] font-display">
              Enterprise Copilot Simulator
            </h4>
            <span className="text-[10px] text-[#78817B]">
              Simulated demonstration • No live API tokens required
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0F2EF] text-[#304F40] text-[10px] font-mono">
          <Cpu className="w-3 h-3 text-[#557C68]" />
          <span>GPT-4o Enterprise</span>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'assistant' && (
              <div className="w-6 h-6 rounded-md bg-[#304F40] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[#557C68] text-white rounded-tr-xs'
                  : 'bg-[#F7F8F6] text-[#222B28] border border-[#E6EAE6] rounded-tl-xs'
              }`}
            >
              {m.text}
            </div>
            {m.role === 'user' && (
              <div className="w-6 h-6 rounded-md bg-[#E7EEE8] text-[#304F40] flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-[#78817B] text-xs pl-8">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#557C68]" />
            <span className="font-mono text-[11px]">Reasoning with workspace records...</span>
          </div>
        )}
      </div>

      {/* Suggested Prompt Pills */}
      <div className="pt-3 pb-2 border-t border-[#E6EAE6]/60 flex flex-wrap gap-1.5">
        {defaultPrompts.map((p) => (
          <button
            key={p}
            onClick={() => handleSend(p)}
            className="text-[10px] px-2.5 py-1 rounded-full bg-[#F7F8F6] hover:bg-[#E7EEE8] text-[#557C68] border border-[#E6EAE6] transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 mt-1"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the simulated copilot a question..."
          className="flex-1 bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
        />
        <button
          type="submit"
          disabled={!input.trim() || isThinking}
          className="p-2 bg-[#304F40] hover:bg-[#557C68] disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
