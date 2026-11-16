import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Workflow, WorkflowStep } from '../../types';
import {
  GitBranch,
  Play,
  Pause,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Database,
  MessageSquare,
  ArrowRight,
  RefreshCw,
  Sliders,
  X,
  AlertCircle,
  Copy,
  ChevronDown,
} from 'lucide-react';

export const AutomationsPage: React.FC = () => {
  const { workflows, createWorkflow, updateWorkflow, deleteWorkflow, toggleWorkflowStatus, currentTenant, showToast } = useDemo();

  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow>(workflows[0] || null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedStepIdx, setSimulatedStepIdx] = useState<number>(-1);
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);

  // Stats
  const totalWorkflows = workflows.length;
  const activeWorkflows = workflows.filter((w) => w.status === 'Active').length;
  const totalExecutions = workflows.reduce((acc, curr) => acc + curr.executionCount, 0);

  // Simulate Running the Workflow step-by-step
  const handleRunDemo = () => {
    if (!selectedWorkflow || isSimulating) return;
    setIsSimulating(true);
    setSimulatedStepIdx(0);

    const stepsCount = selectedWorkflow.steps.length;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < stepsCount) {
        setSimulatedStepIdx(currentStep);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setSimulatedStepIdx(-1);
          showToast('Workflow Simulation Completed', `All ${stepsCount} steps executed successfully with 0 errors.`, 'success');
        }, 600);
      }
    }, 700);
  };

  // Add Step to active builder
  const handleAddStep = (type: 'action' | 'ai' | 'condition') => {
    if (!selectedWorkflow) return;
    const newStep: WorkflowStep = {
      id: `st-${Date.now()}`,
      title: type === 'ai' ? 'AI Synthesis Step' : type === 'condition' ? 'Conditional Logic Branch' : 'External Webhook Dispatch',
      type: type,
      service: type === 'ai' ? 'OpenAI GPT-4o' : type === 'condition' ? 'Branch Router' : 'Slack Gateway',
      description: 'Automatically configured node step.',
      icon: type === 'ai' ? 'Sparkles' : type === 'condition' ? 'GitBranch' : 'Zap',
      status: 'idle',
    };

    const updatedSteps = [...selectedWorkflow.steps, newStep];
    updateWorkflow(selectedWorkflow.id, { steps: updatedSteps });
    setSelectedWorkflow({ ...selectedWorkflow, steps: updatedSteps });
    showToast('Node Added', `Appended new ${type} step to workflow DAG.`, 'info');
  };

  const handleRemoveStep = (stepId: string) => {
    if (!selectedWorkflow || selectedWorkflow.steps.length <= 1) return;
    const updatedSteps = selectedWorkflow.steps.filter((s) => s.id !== stepId);
    updateWorkflow(selectedWorkflow.id, { steps: updatedSteps });
    setSelectedWorkflow({ ...selectedWorkflow, steps: updatedSteps });
    showToast('Node Removed', 'Step removed from workflow sequence.', 'warning');
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Automation & Workflow Center
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Design, deploy, and monitor event-driven execution DAGs for {currentTenant.name}.
          </p>
        </div>

        <button
          onClick={() => {
            createWorkflow({
              name: 'New Custom Event Pipeline',
              trigger: 'Event: Inbound API Webhook payload',
              connectedServices: ['VELORA API', 'Slack'],
            });
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Workflow</span>
        </button>
      </div>

      {/* 4 Metric Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#E6EAE6] shadow-xs">
          <div className="text-[10px] text-[#78817B] uppercase font-mono font-bold">Total Workflows</div>
          <div className="text-xl font-bold font-display text-[#222B28] mt-1">{totalWorkflows}</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#E6EAE6] shadow-xs">
          <div className="text-[10px] text-[#78817B] uppercase font-mono font-bold">Active Engine</div>
          <div className="text-xl font-bold font-display text-[#648B70] mt-1">{activeWorkflows} Active</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#E6EAE6] shadow-xs">
          <div className="text-[10px] text-[#78817B] uppercase font-mono font-bold">Executions (30d)</div>
          <div className="text-xl font-bold font-display text-[#222B28] mt-1">{totalExecutions.toLocaleString()}</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#E6EAE6] shadow-xs">
          <div className="text-[10px] text-[#78817B] uppercase font-mono font-bold">Avg Success Rate</div>
          <div className="text-xl font-bold font-display text-[#557C68] mt-1 font-mono">99.6%</div>
        </div>
      </div>

      {/* Main Builder & Workflows Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of Workflows */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1 text-xs text-[#78817B]">
            <span className="font-bold uppercase tracking-wider text-[10px] font-mono">Available Pipelines</span>
            <span>{workflows.length} items</span>
          </div>

          <div className="space-y-2.5">
            {workflows.map((wf) => {
              const isSelected = selectedWorkflow?.id === wf.id;
              return (
                <div
                  key={wf.id}
                  onClick={() => setSelectedWorkflow(wf)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all text-left relative ${
                    isSelected
                      ? 'bg-white border-[#557C68] shadow-sm ring-1 ring-[#557C68]/30'
                      : 'bg-white border-[#E6EAE6] hover:border-[#557C68]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                        wf.status === 'Active'
                          ? 'bg-[#E7EEE8] text-[#304F40]'
                          : 'bg-[#F0F2EF] text-[#78817B]'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${wf.status === 'Active' ? 'bg-[#648B70]' : 'bg-[#78817B]'}`} />
                      {wf.status}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWorkflowStatus(wf.id);
                        }}
                        className="p-1 rounded text-[#78817B] hover:text-[#222B28] hover:bg-[#F0F2EF]"
                        title={wf.status === 'Active' ? 'Pause' : 'Activate'}
                      >
                        {wf.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteWorkflow(wf.id);
                        }}
                        className="p-1 rounded text-[#78817B] hover:text-[#B87570] hover:bg-[#F0F2EF]"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-[#222B28] font-display mb-1">
                    {wf.name}
                  </h3>
                  <p className="text-[11px] text-[#78817B] leading-tight mb-3 line-clamp-1">
                    {wf.trigger}
                  </p>

                  <div className="pt-2 border-t border-[#E6EAE6] flex items-center justify-between text-[10px] text-[#78817B] font-mono">
                    <span>{wf.steps.length} Steps</span>
                    <span className="text-[#648B70]">{wf.successRate}% Success</span>
                    <span>{wf.lastExecution}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Visual Workflow DAG Canvas & Step-by-Step Simulator */}
        {selectedWorkflow && (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E6EAE6] mb-6">
              <div>
                <span className="text-[9px] font-mono text-[#557C68] uppercase font-bold tracking-wider">
                  VISUAL DAG BUILDER
                </span>
                <h3 className="text-base font-bold text-[#222B28] font-display">
                  {selectedWorkflow.name}
                </h3>
                <p className="text-[11px] text-[#78817B] mt-0.5 font-mono">
                  Trigger: {selectedWorkflow.trigger}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunDemo}
                  disabled={isSimulating}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer ${
                    isSimulating
                      ? 'bg-[#E7EEE8] text-[#557C68] cursor-not-allowed'
                      : 'bg-[#304F40] hover:bg-[#557C68] text-white'
                  }`}
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Simulating DAG Step {simulatedStepIdx + 1}...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Run Demo Simulation</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Steps Nodes Flow */}
            <div className="space-y-3 relative mb-6">
              {selectedWorkflow.steps.map((step, idx) => {
                const isCurrentlyExecuting = isSimulating && simulatedStepIdx === idx;
                const isCompleted = isSimulating && simulatedStepIdx > idx;

                const nodeTypeBadge = {
                  trigger: 'bg-[#557C68] text-white',
                  action: 'bg-[#304F40] text-white',
                  ai: 'bg-[#B89A68] text-white',
                  condition: 'bg-[#648B70] text-white',
                }[step.type];

                return (
                  <div key={step.id} className="relative group">
                    <div
                      className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        isCurrentlyExecuting
                          ? 'bg-[#E7EEE8] border-[#557C68] shadow-md ring-2 ring-[#557C68]/40'
                          : isCompleted
                          ? 'bg-white border-[#648B70]/60 shadow-xs'
                          : 'bg-[#F7F8F6] border-[#E6EAE6]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`w-6 h-6 rounded-lg text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 ${nodeTypeBadge}`}
                        >
                          0{idx + 1}
                        </span>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-[#222B28] font-display">
                              {step.title}
                            </h4>
                            <span className="text-[9px] font-mono px-2 py-0.2 rounded bg-white text-[#78817B] border border-[#E6EAE6]">
                              {step.service}
                            </span>
                            {isCurrentlyExecuting && (
                              <span className="text-[9px] font-mono text-[#557C68] font-semibold animate-pulse">
                                Executing...
                              </span>
                            )}
                            {isCompleted && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#648B70]" />
                            )}
                          </div>
                          <p className="text-[11px] text-[#78817B] mt-0.5 leading-snug">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveStep(step.id)}
                        className="opacity-0 group-hover:opacity-100 text-[#78817B] hover:text-[#B87570] p-1 transition-opacity"
                        title="Delete Step"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Connecting line marker */}
                    {idx < selectedWorkflow.steps.length - 1 && (
                      <div className="w-0.5 h-3 bg-[#E6EAE6] mx-auto my-0.5" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add Node Controls */}
            <div className="pt-4 border-t border-[#E6EAE6] flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] font-mono">
                Append Node Step:
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAddStep('action')}
                  className="px-3 py-1.5 rounded-xl bg-[#F0F2EF] hover:bg-[#E7EEE8] text-xs font-medium text-[#222B28] transition-colors"
                >
                  + Action Node
                </button>
                <button
                  onClick={() => handleAddStep('ai')}
                  className="px-3 py-1.5 rounded-xl bg-[#F0F2EF] hover:bg-[#E7EEE8] text-xs font-medium text-[#B89A68] transition-colors"
                >
                  + AI Step
                </button>
                <button
                  onClick={() => handleAddStep('condition')}
                  className="px-3 py-1.5 rounded-xl bg-[#F0F2EF] hover:bg-[#E7EEE8] text-xs font-medium text-[#557C68] transition-colors"
                >
                  + Condition
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
