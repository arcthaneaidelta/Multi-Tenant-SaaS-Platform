import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { AI_ASSISTANTS } from '../../data/initialData';
import { AiAssistant, AiChatMessage } from '../../types';
import {
  Sparkles,
  Send,
  Plus,
  Bot,
  User,
  Cpu,
  BarChart3,
  RefreshCw,
  Target,
  GitBranch,
  Check,
  ChevronRight,
  Sliders,
  History,
} from 'lucide-react';

export const AIWorkspacePage: React.FC = () => {
  const { currentTenant } = useDemo();
  const [selectedAssistant, setSelectedAssistant] = useState<AiAssistant>(AI_ASSISTANTS[0]);
  const [selectedModel, setSelectedModel] = useState('GPT-4o Enterprise');
  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const [chatHistory, setChatHistory] = useState<Record<string, AiChatMessage[]>>({
    'asst-general': [
      {
        id: 'msg-1',
        sender: 'assistant',
        content: `Greetings, ${currentTenant.adminName.split(' ')[0]}. I am your General Business Copilot for ${currentTenant.name}. I have real-time visibility across active CRM deals, automations, and member logs. How may I assist you today?`,
        timestamp: '10:00 AM',
        modelUsed: 'GPT-4o Enterprise',
      },
    ],
    'asst-sales': [
      {
        id: 'msg-s1',
        sender: 'assistant',
        content: `Sales Intelligence active. Currently monitoring 42 inbound leads in ${currentTenant.name}'s pipeline with an average qualification score of 88/100.`,
        timestamp: '10:05 AM',
        modelUsed: 'Claude 3.5 Sonnet',
      },
    ],
    'asst-workflow': [
      {
        id: 'msg-w1',
        sender: 'assistant',
        content: `Workflow Systems Engineer online. Ready to optimize your DAG triggers, conditional routing, and webhook retry policies.`,
        timestamp: '10:10 AM',
        modelUsed: 'VELORA Fine-Tuned Local',
      },
    ],
    'asst-data': [
      {
        id: 'msg-d1',
        sender: 'assistant',
        content: `Quantitative Telemetry Analyst connected. Ready to execute simulated cohort analysis, SQL queries, and storage projections.`,
        timestamp: '10:15 AM',
        modelUsed: 'GPT-4o Enterprise',
      },
    ],
  });

  const currentMessages = chatHistory[selectedAssistant.id] || [];

  const simulatedResponses: Record<string, string> = {
    'Summarize our latest business activity across teams':
      `Here is your executive operations synthesis for ${currentTenant.name}:\n\n` +
      `• Lead Velocity: CRM captured 42 new enterprise leads (+18% week-over-week). 99.4% passed AI qualification rules.\n` +
      `• Automations: 1,248 automated workflows executed with 0 runtime errors. The "Lead Qualification & Routing" pipeline saved an estimated 14 engineer-hours.\n` +
      `• Storage & Capacity: Current storage is at ${currentTenant.storageUsedGB} GB of ${currentTenant.maxStorageGB} GB allocated limit (healthy).\n` +
      `• Action Item: 3 enterprise prospect inquiries are awaiting review in the Sales queue.`,

    'Identify opportunities in our CRM':
      `CRM Pipeline Opportunity Analysis:\n\n` +
      `1. Global Logistics Corp ($140,000 ARR): Technical evaluation completed with 94 ICP score. Recommended: Trigger automated follow-up calendar invite.\n` +
      `2. Beacon Healthcare ($85,000 ARR): Stalled in Legal Review for 6 days. Recommended: Dispatch automated NDA reminder to procurement lead.\n` +
      `3. Vertex Media ($52,000 ARR): Inbound webhook indicated team expansion to 40 seats. Ideal candidate for Growth tier upsell.`,

    'Create an automation workflow':
      `I have formulated an optimized 5-step automation pipeline:\n\n` +
      `[Trigger] Inbound Marketing Webhook → [AI Node] Lead Intent Qualification → [Condition] Score > 85 → [Action] Create CRM Account → [Action] Dispatch High-Priority Slack Alert.\n\n` +
      `Would you like me to push this directly into your visual Automation Center?`,

    'Analyze workspace performance':
      `System Telemetry & Operational Health Summary:\n\n` +
      `• Edge Gateway Latency: 18ms across all regions.\n` +
      `• Token Burn Rate: ${currentTenant.aiTokensUsed.toLocaleString()} tokens utilized out of ${currentTenant.maxAiTokens.toLocaleString()} allocated monthly quota.\n` +
      `• Active API Integrations: Stripe, Slack, and OpenAI are reporting 100% heartbeat availability.\n` +
      `• Recommendation: Current configuration is optimal. No throttling or upgrade required.`,
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isThinking) return;

    const userMsg: AiChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => ({
      ...prev,
      [selectedAssistant.id]: [...(prev[selectedAssistant.id] || []), userMsg],
    }));

    setInputMessage('');
    setIsThinking(true);

    setTimeout(() => {
      let replyContent = simulatedResponses[text];
      if (!replyContent) {
        replyContent =
          `I analyzed your prompt: "${text}". Based on records in ${currentTenant.name}'s workspace, ` +
          `all 6 active modules are synchronizing normally, permissions are enforced per the RBAC matrix, and operational data isolation remains strictly verified.`;
      }

      const assistantMsg: AiChatMessage = {
        id: `msg-resp-${Date.now()}`,
        sender: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
        tokensUsed: Math.floor(Math.random() * 240 + 120),
      };

      setChatHistory((prev) => ({
        ...prev,
        [selectedAssistant.id]: [...(prev[selectedAssistant.id] || []), assistantMsg],
      }));
      setIsThinking(false);
    }, 650);
  };

  const handleNewChat = () => {
    setChatHistory((prev) => ({
      ...prev,
      [selectedAssistant.id]: [
        {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          content: `New conversation started with ${selectedAssistant.name}. How can I assist you with ${currentTenant.name}'s operations?`,
          timestamp: 'Just now',
          modelUsed: selectedModel,
        },
      ],
    }));
  };

  return (
    <div className="h-[calc(100vh-125px)] flex flex-col sm:flex-row gap-4 text-left">
      {/* Left Panel: Assistants & Recent Chats (w-64) */}
      <div className="w-full sm:w-64 bg-white rounded-2xl border border-[#E6EAE6] p-4 flex flex-col justify-between shrink-0 shadow-xs">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#E6EAE6] mb-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] font-mono">
              Domain Assistants
            </span>
            <button
              onClick={handleNewChat}
              className="p-1 text-[#557C68] hover:bg-[#E7EEE8] rounded-lg transition-colors"
              title="New Conversation"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5">
            {AI_ASSISTANTS.map((asst) => {
              const isSelected = selectedAssistant.id === asst.id;
              return (
                <button
                  key={asst.id}
                  onClick={() => setSelectedAssistant(asst)}
                  className={`w-full p-2.5 rounded-xl text-left transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-[#E7EEE8] text-[#304F40] border border-[#557C68]/30 shadow-xs'
                      : 'hover:bg-[#F7F8F6] text-[#222B28] border border-transparent'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-[#557C68] text-white' : 'bg-[#F0F2EF] text-[#78817B]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold font-display truncate leading-tight">
                      {asst.name}
                    </div>
                    <div className="text-[10px] text-[#78817B] truncate mt-0.5 font-mono">
                      {asst.role}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Left footer: Token Counter */}
        <div className="pt-3 border-t border-[#E6EAE6] space-y-1.5 text-xs">
          <div className="flex justify-between text-[#78817B] text-[11px]">
            <span>Monthly Token Burn</span>
            <span className="font-mono text-[#222B28]">
              {((currentTenant.aiTokensUsed / currentTenant.maxAiTokens) * 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#F0F2EF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#557C68] rounded-full"
              style={{ width: `${(currentTenant.aiTokensUsed / currentTenant.maxAiTokens) * 100}%` }}
            />
          </div>
          <span className="text-[9px] text-[#78817B] font-mono block">
            {currentTenant.aiTokensUsed.toLocaleString()} / {currentTenant.maxAiTokens.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Main Panel: Conversation Area */}
      <div className="flex-1 bg-white rounded-2xl border border-[#E6EAE6] flex flex-col justify-between shadow-xs overflow-hidden">
        {/* Chat Header */}
        <div className="p-3.5 border-b border-[#E6EAE6] flex items-center justify-between bg-[#F7F8F6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E7EEE8] text-[#304F40] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-[#557C68]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#222B28] font-display flex items-center gap-2">
                <span>{selectedAssistant.name}</span>
                <span className="text-[9px] bg-white border border-[#E6EAE6] px-2 py-0.2 rounded-full font-mono text-[#648B70]">
                  Active Copilot
                </span>
              </div>
              <p className="text-[10px] text-[#78817B]">{selectedAssistant.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNewChat}
              className="text-xs text-[#78817B] hover:text-[#222B28] px-2 py-1 rounded-lg border border-[#E6EAE6] bg-white"
            >
              Reset Chat
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-[#304F40] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[80%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#557C68] text-white rounded-tr-xs'
                    : 'bg-[#F7F8F6] text-[#222B28] border border-[#E6EAE6] rounded-tl-xs whitespace-pre-line'
                }`}
              >
                {msg.content}
                {msg.tokensUsed && (
                  <div className="mt-2 pt-1.5 border-t border-black/5 text-[9px] font-mono text-[#78817B] flex items-center justify-between">
                    <span>Model: {msg.modelUsed}</span>
                    <span>{msg.tokensUsed} tokens</span>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[#E7EEE8] text-[#304F40] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  {currentTenant.adminName[0]}
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-[#78817B] text-xs pl-10">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#557C68]" />
              <span className="font-mono text-[11px]">
                Reasoning with {selectedModel}...
              </span>
            </div>
          )}
        </div>

        {/* Suggested Prompts Bar */}
        <div className="px-4 py-2 border-t border-[#E6EAE6]/60 bg-[#F7F8F6]/60 flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[10px] text-[#78817B] uppercase font-mono font-bold shrink-0">
            Suggested:
          </span>
          {selectedAssistant.defaultPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="text-[10px] px-2.5 py-1 rounded-full bg-white hover:bg-[#E7EEE8] text-[#557C68] border border-[#E6EAE6] whitespace-nowrap transition-colors shrink-0 cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#E6EAE6]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask ${selectedAssistant.name} a question about ${currentTenant.name}...`}
              className="flex-1 bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-4 py-2.5 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isThinking}
              className="p-2.5 bg-[#304F40] hover:bg-[#557C68] disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel: Assistant Metadata & Model Selection (w-64) */}
      <div className="hidden lg:flex w-64 bg-white rounded-2xl border border-[#E6EAE6] p-4 flex-col justify-between shrink-0 shadow-xs">
        <div className="space-y-4">
          <div className="pb-3 border-b border-[#E6EAE6]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] font-mono">
              Inference Parameters
            </span>
          </div>

          {/* Model Selector */}
          <div>
            <label className="text-[10px] uppercase font-bold text-[#78817B] block mb-1">
              Active LLM Engine
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3 py-2 text-xs font-medium text-[#222B28] focus:outline-none"
            >
              <option value="GPT-4o Enterprise">GPT-4o Enterprise</option>
              <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
              <option value="VELORA Fine-Tuned Local">VELORA Fine-Tuned Local</option>
              <option value="Demo Architecture Model">Demo Architecture Model</option>
            </select>
          </div>

          {/* Model Metrics */}
          <div className="bg-[#F7F8F6] rounded-xl p-3 border border-[#E6EAE6] space-y-2 text-[11px]">
            <div className="flex justify-between text-[#78817B]">
              <span>Context Window</span>
              <span className="font-mono text-[#222B28]">128,000 tokens</span>
            </div>
            <div className="flex justify-between text-[#78817B]">
              <span>Avg Latency</span>
              <span className="font-mono text-[#648B70]">410ms</span>
            </div>
            <div className="flex justify-between text-[#78817B]">
              <span>Data Retention</span>
              <span className="font-mono text-[#222B28]">Zero Day Policy</span>
            </div>
            <div className="flex justify-between text-[#78817B]">
              <span>Isolation</span>
              <span className="font-mono text-[#557C68]">Tenant Scoped</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-[#78817B] leading-relaxed">
            All prompts and context injections are processed through tenant-isolated vector partitions with zero cross-tenant training.
          </div>
        </div>

        <div className="pt-3 border-t border-[#E6EAE6] text-[10px] text-[#78817B] font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#648B70]" />
          <span>Gateway Status: Operational</span>
        </div>
      </div>
    </div>
  );
};
