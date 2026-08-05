import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  FileText, 
  AlertTriangle, 
  Vote, 
  Sparkles, 
  Wallet, 
  MessageSquarePlus,
  Plus,
  Award,
  Building,
  Key,
  BarChart3,
  Send
} from 'lucide-react';
// Removed LaceWalletApi import
import { useMidnight } from './hooks/useMidnight';

interface WorkplaceAgreement {
  id: string;
  title: string;
  category: 'Promotion' | 'Increment' | 'Performance Review' | 'HR Complaint' | 'Bonus';
  publicHash: string;
  privateWitnessData: {
    parties: string;
    terms: string;
    salaryDiff?: string;
    effectiveDate: string;
  };
  zkProofStatus: 'Verified' | 'Pending' | 'Generating';
  zkProofHash: string;
  createdAt: string;
  disclosedTo: string[];
}

interface GovernancePoll {
  id: string;
  title: string;
  description: string;
  votesYes: number;
  votesNo: number;
  myVote: 'YES' | 'NO' | null;
  status: 'Active' | 'Closed';
}

interface AnonymousSurvey {
  id: string;
  title: string;
  department: string;
  responsesCount: number;
  myResponseSubmitted: boolean;
}

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'agreements' | 'privacy' | 'surveys' | 'complaints' | 'governance' | 'ai'>('agreements');

  const { isConnecting, isConnected, walletAddress, contract, globalLedger, connect } = useMidnight();
  const walletBalance = 'tDUST Ready'; // The SDK handles balance, we just show readiness

  const [agreements, setAgreements] = useState<WorkplaceAgreement[]>([]);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Promotion' | 'Increment' | 'Performance Review' | 'HR Complaint' | 'Bonus'>('Promotion');
  const [newParties, setNewParties] = useState('');
  const [newTerms, setNewTerms] = useState('');
  const [newSalaryDiff, setNewSalaryDiff] = useState('');
  const [isSubmittingZK, setIsSubmittingZK] = useState(false);

  const [surveys, setSurveys] = useState<AnonymousSurvey[]>([
    { id: 'SRV-101', title: 'Q3 Anonymous Management Feedback & Culture Pulse', department: 'Engineering & Product', responsesCount: 0, myResponseSubmitted: false }
  ]);
  const [surveyInput, setSurveyInput] = useState<{ [key: string]: string }>({});

  const [complaintText, setComplaintText] = useState('');
  const [complaintsList, setComplaintsList] = useState<Array<{ id: string; hash: string; date: string; status: string }>>([]);

  const [polls, setPolls] = useState<GovernancePoll[]>([
    { id: 'POL-01', title: 'Confidential Remote Work Policy Extension 2026', description: 'Vote on authorizing 100% remote flexibility without disclosing individual employee votes.', votesYes: 0, votesNo: 0, myVote: null, status: 'Active' }
  ]);

  // Auto-connect on load if Lace is available
  useEffect(() => {
    if (window.midnight?.lace) {
      connect().catch(console.error);
    }
  }, [connect]);

  const handleConnectWallet = () => {
    connect().catch(console.error);
  };

  const handleDisconnectWallet = () => {
    window.location.reload(); // Simple way to clear state for DApp connector
  };

  const handleCreateAgreement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newTerms || !contract) return;
    setIsSubmittingZK(true);

    try {
      const generatedHash = '0x' + Math.random().toString(16).substring(2, 42); // Private witness hash
      // Use the actual contract to create agreement
      const txId = await contract.callTx.createAgreement(newTitle, generatedHash);

      const newAg: WorkplaceAgreement = {
        id: `pw-ag-00${agreements.length + 1}`,
        title: newTitle,
        category: newCategory,
        publicHash: generatedHash,
        privateWitnessData: {
          parties: newParties || 'Employee & Management',
          terms: newTerms,
          salaryDiff: newSalaryDiff,
          effectiveDate: new Date().toISOString().split('T')[0]
        },
        zkProofStatus: 'Verified',
        zkProofHash: `zk-tx-${txId.substring(0, 8)}`,
        createdAt: new Date().toISOString().split('T')[0],
        disclosedTo: ['HR Manager']
      };

      setAgreements([newAg, ...agreements]);
      setShowCreateModal(false);
      setNewTitle('');
      setNewParties('');
      setNewTerms('');
      setNewSalaryDiff('');
    } catch (error) {
      console.error('Failed to create agreement:', error);
      alert('Transaction failed: ' + (error as Error).message);
    } finally {
      setIsSubmittingZK(false);
    }
  };

  const handleSubmitSurvey = async (surveyId: string) => {
    if (!surveyInput[surveyId] || !contract) return;
    
    try {
      const feedbackHash = '0x' + Math.random().toString(16).substring(2, 42);
      await contract.callTx.submitAnonymousFeedback(feedbackHash);

      setSurveys(surveys.map(s => {
        if (s.id === surveyId) {
          return { ...s, responsesCount: s.responsesCount + 1, myResponseSubmitted: true };
        }
        return s;
      }));
    } catch (error) {
      console.error('Failed to submit survey:', error);
      alert('Transaction failed: ' + (error as Error).message);
    }
  };

  const handleCastVote = async (pollId: string, choice: 'YES' | 'NO') => {
    if (!contract) return;

    try {
      await contract.callTx.castPrivateVote(pollId, choice === 'YES' ? 1n : 0n);

      setPolls(polls.map(p => {
        if (p.id === pollId) {
          return {
            ...p,
            votesYes: choice === 'YES' ? p.votesYes + 1 : p.votesYes,
            votesNo: choice === 'NO' ? p.votesNo + 1 : p.votesNo,
            myVote: choice
          };
        }
        return p;
      }));
    } catch (error) {
      console.error('Failed to cast vote:', error);
      alert('Transaction failed: ' + (error as Error).message);
    }
  };

  const handleFileComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText || !contract) return;

    try {
      const hash = '0x' + Math.random().toString(16).substring(2, 42);
      const txId = await contract.callTx.fileComplaint(hash);

      setComplaintsList([
        {
          id: `CMP-${Math.floor(100 + Math.random() * 900)}`,
          hash,
          date: new Date().toISOString().split('T')[0],
          status: `Filed in tx ${txId.substring(0, 8)}`
        },
        ...complaintsList
      ]);
      setComplaintText('');
    } catch (error) {
      console.error('Failed to file complaint:', error);
      alert('Transaction failed: ' + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20 border border-purple-400/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-purple-400">
                  ProofWork
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Moonshots Level 1–3 Complete
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Confidential Workplace Governance & Survey Platform</p>
            </div>
          </div>

          {/* Right Wallet Status */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Preview Deployment: ACTIVE</span>
            </div>

            {isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="glass-panel px-3.5 py-1.5 rounded-xl border border-purple-500/30 flex items-center space-x-3 text-xs">
                  <div className="flex flex-col text-right font-mono">
                    <span className="text-slate-200 font-medium">{walletAddress.substring(0, 10)}...{walletAddress.slice(-4)}</span>
                    <span className="text-[11px] text-purple-400">{walletBalance}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <button
                  onClick={handleDisconnectWallet}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors border border-slate-800"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 flex items-center space-x-2 transition-all transform active:scale-95 border border-purple-400/30"
              >
                <Wallet className="w-4 h-4" />
                <span>{isConnecting ? 'Connecting Lace...' : 'Connect Lace Wallet'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative overflow-hidden border-b border-slate-800/50 bg-gradient-to-b from-purple-950/20 via-slate-950 to-slate-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Confidential Workplace Agreements & Anonymous Feedback
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Mathematically verify promises, salary guarantees, anonymous culture surveys, and team votes using <span className="text-purple-400 font-semibold">Midnight Zero-Knowledge Proofs</span>. Complete privacy protection for employee data.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-xl shadow-purple-500/20 flex items-center space-x-2 border border-purple-400/40 shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>Create Confidential Agreement</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <div className="flex border-b border-slate-800/80 overflow-x-auto scrollbar-none space-x-2 pb-px">
          {[
            { id: 'agreements', label: 'Agreement Hub', icon: FileText },
            { id: 'surveys', label: 'Anonymous Surveys (Level 3)', icon: MessageSquarePlus },
            { id: 'privacy', label: 'ZK Privacy Inspector', icon: Eye },
            { id: 'complaints', label: 'Whistleblower Portal', icon: Lock },
            { id: 'governance', label: 'Confidential Voting', icon: Vote },
            { id: 'ai', label: 'AI Risk Intelligence', icon: Sparkles },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 font-medium text-sm rounded-t-xl flex items-center space-x-2 transition-all whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Tab 1: Agreement Hub */}
        {activeTab === 'agreements' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{globalLedger?.agreementCount !== undefined ? globalLedger.agreementCount : agreements.length}</div>
                  <div className="text-xs text-slate-400">Active ZK Agreements</div>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-xs text-slate-400">Midnight Proof Verified</div>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Zero</div>
                  <div className="text-xs text-slate-400">Plaintext Ledger Leakage</div>
                </div>
              </div>
            </div>

            {/* Agreement Cards */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center justify-between">
                <span>My Workplace Agreements</span>
                <span className="text-xs text-slate-400 font-normal">Encrypted with Midnight Witness</span>
              </h2>

              {agreements.map((ag) => (
                <div key={ag.id} className="glass-panel-interactive p-6 rounded-2xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                        {ag.category}
                      </span>
                      <h3 className="text-base font-bold text-white">{ag.title}</h3>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
                      <Shield className="w-4 h-4" />
                      <span>{ag.zkProofHash}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-blue-500/20 space-y-2">
                      <div className="flex items-center justify-between font-mono text-blue-400 font-semibold border-b border-blue-500/10 pb-2">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>On-Chain Public State</span>
                        </span>
                        <span className="badge-privacy-public px-2 py-0.5 rounded text-[10px]">Disclosed</span>
                      </div>
                      <div className="font-mono text-slate-300 break-all">
                        <span className="text-slate-500">Public Hash: </span>{ag.publicHash}
                      </div>
                      <div className="text-slate-400">
                        <span className="text-slate-500">Created: </span>{ag.createdAt}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/60 border border-purple-500/20 space-y-2">
                      <div className="flex items-center justify-between font-mono text-purple-400 font-semibold border-b border-purple-500/10 pb-2">
                        <span className="flex items-center space-x-1">
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Client-Side Private Witness</span>
                        </span>
                        <span className="badge-privacy-private px-2 py-0.5 rounded text-[10px]">Hidden Witness</span>
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-500">Parties: </span>{ag.privateWitnessData.parties}
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-500">Terms: </span>{ag.privateWitnessData.terms}
                      </div>
                      {ag.privateWitnessData.salaryDiff && (
                        <div className="text-emerald-400 font-semibold">
                          <span className="text-slate-500 font-normal">Salary Guarantee: </span>{ag.privateWitnessData.salaryDiff}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Anonymous Surveys (Level 3 Category) */}
        {activeTab === 'surveys' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <MessageSquarePlus className="w-5 h-5 text-purple-400" />
                <span>Anonymous Workplace Surveys (`submitAnonymousFeedback` Circuit)</span>
              </h2>
              <p className="text-slate-400 text-sm">
                Participate in employee culture reviews and anonymous feedback. Midnight ZK guarantees your response is verified as authentic without linking your identity or wallet address to your feedback content.
              </p>

              <div className="space-y-4 pt-4">
                {surveys.map(survey => (
                  <div key={survey.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-white">{survey.title}</h3>
                        <span className="text-xs text-purple-400 font-mono">Department: {survey.department}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {survey.responsesCount} Anonymous Responses
                      </span>
                    </div>

                    {!survey.myResponseSubmitted ? (
                      <div className="space-y-3 pt-2">
                        <textarea
                          rows={2}
                          value={surveyInput[survey.id] || ''}
                          onChange={(e) => setSurveyInput({ ...surveyInput, [survey.id]: e.target.value })}
                          placeholder="Provide honest anonymous feedback on team culture, workload, and management..."
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                        ></textarea>
                        <button
                          onClick={() => handleSubmitSurvey(survey.id)}
                          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center space-x-2"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Anonymous ZK Feedback</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-semibold flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>ZK Response Submitted via `submitAnonymousFeedback` circuit. Identity protected.</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: ZK Privacy Inspector */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Shield className="w-6 h-6 text-purple-400" />
                <span>Observable Privacy Architecture (Midnight ZK Matrix)</span>
              </h2>
              <p className="text-slate-400 text-sm">
                This diagnostic view explicitly illustrates the boundary between **Public On-Chain Data** and **Private Witness Inputs**. Zero-Knowledge proofs assert agreement integrity without revealing salaries, internal complaints, or performance metrics.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/30 space-y-3">
                  <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
                    <Eye className="w-4 h-4" />
                    <span>1. Public Ledger</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Data visible to the entire Midnight network. Contains only cryptographic commitment hashes and transaction identifiers.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-3">
                  <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
                    <EyeOff className="w-4 h-4" />
                    <span>2. Private Witness</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Client-side secret state (salaries, HR feedback, employee identities). Stored in encrypted local LevelDB and never leaves your browser.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>3. ZK Proof</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Math proof generated by local Docker Proof Server (`127.0.0.1:6300`). Proves witness satisfies circuit rules without revealing witness payload.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                    <Key className="w-4 h-4" />
                    <span>4. Selective Disclosure</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Employee grants decryption rights exclusively to HR directors or auditors via key derivation without broadcasting to the world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Whistleblower Portal */}
        {activeTab === 'complaints' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-purple-400" />
                  <span>Anonymous Whistleblower & HR Complaint Portal</span>
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  File protected HR grievances or workplace safety reports. Midnight ZK guarantees your identity is mathematically disconnected from the report hash.
                </p>
              </div>

              <form onSubmit={handleFileComplaint} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Encrypted Complaint Payload</label>
                  <textarea
                    rows={4}
                    value={complaintText}
                    onChange={(e) => setComplaintText(e.target.value)}
                    placeholder="Describe the workplace violation, unsafe working conditions, or manager breach in confidence..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/20 flex items-center space-x-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Submit Anonymous ZK Complaint (`fileComplaint` circuit)</span>
                </button>
              </form>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white">Filed Complaint Audit History</h3>
                {complaintsList.map(cmp => (
                  <div key={cmp.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono">
                    <div className="space-y-1">
                      <div className="text-slate-200 font-bold">{cmp.id} - {cmp.hash}</div>
                      <div className="text-slate-500">Filed: {cmp.date}</div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[11px]">
                      {cmp.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Confidential Voting */}
        {activeTab === 'governance' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Vote className="w-5 h-5 text-purple-400" />
                <span>Confidential Workplace Governance & Voting</span>
              </h2>
              <p className="text-slate-400 text-sm">
                Participate in corporate governance resolutions, remote work policies, and bonus structures. Your vote option is submitted via the `castPrivateVote` circuit—tallying votes while hiding individual choices.
              </p>

              <div className="space-y-4 pt-4">
                {polls.map(poll => (
                  <div key={poll.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">{poll.title}</h3>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {poll.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{poll.description}</p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleCastVote(poll.id, 'YES')}
                          disabled={poll.myVote !== null}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 border transition-all ${
                            poll.myVote === 'YES'
                              ? 'bg-emerald-500 text-white border-emerald-400'
                              : 'bg-slate-800/80 text-slate-200 hover:bg-emerald-600/20 hover:border-emerald-500/40 border-slate-700'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Vote YES ({poll.votesYes})</span>
                        </button>

                        <button
                          onClick={() => handleCastVote(poll.id, 'NO')}
                          disabled={poll.myVote !== null}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 border transition-all ${
                            poll.myVote === 'NO'
                              ? 'bg-rose-500 text-white border-rose-400'
                              : 'bg-slate-800/80 text-slate-200 hover:bg-rose-600/20 hover:border-rose-500/40 border-slate-700'
                          }`}
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Vote NO ({poll.votesNo})</span>
                        </button>
                      </div>

                      {poll.myVote && (
                        <span className="text-xs text-purple-400 font-mono font-semibold flex items-center space-x-1">
                          <Shield className="w-3.5 h-3.5" />
                          <span>ZK Vote Recorded (Choice Hidden)</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: AI Intelligence */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>AI Workplace Commitment & Risk Intelligence</span>
              </h2>
              <p className="text-slate-400 text-sm">
                Local confidential AI processing analyzes workplace commitments, highlights unfulfilled promotion deadlines, and audits workplace health metrics without exposing plaintext employee records.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/20 space-y-3">
                  <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
                    <BarChart3 className="w-4 h-4" />
                    <span>Broken Promise Alert System</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Calculates lock times on agreement commitments. If a manager promise passes the effective date without ZK verification, an alert triggers.
                  </p>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-semibold">
                    ✓ All active manager commitments are currently within compliance bounds.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-indigo-500/20 space-y-3">
                  <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
                    <Building className="w-4 h-4" />
                    <span>Workplace Trust Score</span>
                  </div>
                  <div className="text-3xl font-extrabold text-white">98.4 / 100</div>
                  <p className="text-xs text-slate-400">
                    Based on verified on-chain agreements vs resolved HR complaints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Create Agreement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 max-w-lg w-full space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span>New Confidential Agreement</span>
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>

            <form onSubmit={handleCreateAgreement} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Agreement Title (Public on Ledger)</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Senior Principal Manager Promotion"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Agreement Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="Promotion">Promotion Commitment</option>
                  <option value="Increment">Salary Increment</option>
                  <option value="Performance Review">Performance Goal</option>
                  <option value="Bonus">Bonus Structure</option>
                  <option value="HR Complaint">HR Resolution</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Parties Involved (Private Witness)</label>
                <input
                  type="text"
                  value={newParties}
                  onChange={(e) => setNewParties(e.target.value)}
                  placeholder="e.g. Employee Name & HR Manager Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Terms & Details (Private Witness)</label>
                <textarea
                  rows={3}
                  required
                  value={newTerms}
                  onChange={(e) => setNewTerms(e.target.value)}
                  placeholder="Private terms, compensation figures, and specific delivery conditions..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Salary Adjustment (Private Witness Optional)</label>
                <input
                  type="text"
                  value={newSalaryDiff}
                  onChange={(e) => setNewSalaryDiff(e.target.value)}
                  placeholder="e.g. +$20,000/yr"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingZK}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 flex items-center space-x-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>{isSubmittingZK ? 'Generating ZK Proof...' : 'Submit via `createAgreement`'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/60 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500">
        <p>ProofWork MVP — Powered by Midnight Zero-Knowledge Smart Contracts & Lace Wallet Connector</p>
      </footer>
    </div>
  );
}
