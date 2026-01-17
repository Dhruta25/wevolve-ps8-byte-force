import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import { useJob } from "./JobContext";
import { ArrowLeft, Sparkles, Building, Rocket, Coffee, Globe, Send, Loader2, Copy, Check, Info } from "lucide-react";

export default function Third() {
  const navigate = useNavigate();
  const { formData, updateFormData, result, setResult, loading, setLoading } = useJob();
  const [selectedVariant, setSelectedVariant] = React.useState('default');
  const [copied, setCopied] = React.useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setSelectedVariant('default');
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/job/generate?use_llm=true", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Backend Error:", err.message);
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const textToCopy = result?.llm_variants?.[selectedVariant]?.content || result?.llm_enhanced;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="container mx-auto px-4 py-12 max-w-6xl"
    >
      <div className="flex items-center gap-4 mb-12">
        <button
          onClick={() => navigate("/second")}
          className="p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-400"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">Culture & Details</h1>
          <p className="text-slate-400">Final touches for your job description</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Left Side: Final Inputs */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8 space-y-6">
            <div>
              <label className="label-text">Company Culture</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'Startup', icon: Rocket, label: 'Fast-paced Startup' },
                  { id: 'Corporate', icon: Building, label: 'Stable Corporate' },
                  { id: 'Remote-first', icon: Globe, label: 'Remote-first' },
                  { id: 'Creative', icon: Coffee, label: 'Creative Studio' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateFormData({ company_culture: item.id })}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${formData.company_culture === item.id
                      ? 'bg-cyan-500/20 border-cyan-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                  >
                    <item.icon size={18} className={formData.company_culture === item.id ? 'text-cyan-400' : 'text-slate-500'} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label-text">Special Requirements (Optional)</label>
              <textarea
                rows="5"
                placeholder="Mention specific benefits, tech stack details, or unique requirements..."
                className="input-field resize-none"
                value={formData.special_requirements}
                onChange={(e) => updateFormData({ special_requirements: e.target.value })}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !formData.company_culture}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Description
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-3">
            <Info className="text-amber-500 shrink-0" size={20} />
            <p className="text-sm text-slate-400/80 leading-relaxed">
              <strong>Tip:</strong> The AI will use your cultural selection to set the tone of the description. Startups get more energetic language, while corporates get more professional tone.
            </p>
          </div>
        </div>

        {/* Right Side: Result Display */}
        <div className="lg:col-span-3 min-h-[600px] flex flex-col">
          <AnimatePresence mode="wait">
            {!loading && !result ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="glass-card flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                  <Send size={32} className="text-slate-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Ready to Generate</h3>
                  <p className="text-slate-500 max-w-sm">
                    Complete the final steps and click generate. AI will craft a high-converting job description for you.
                  </p>
                </div>
              </motion.div>
            ) : loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card flex-1 flex flex-col items-center justify-center p-12 space-y-8"
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-pulse" size={32} />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-white">AI is Crafting Your JD</h3>
                  <p className="text-slate-400 italic">Analyzing requirements, industry trends, and role specifics...</p>
                </div>
                <div className="w-full max-w-xs space-y-3">
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-cyan-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                </div>
              </motion.div>
            ) : result?.error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-8 border-red-500/50 bg-red-500/5"
              >
                <h3 className="text-xl font-bold text-red-500 mb-2">Generation Failed</h3>
                <p className="text-slate-400">{result.error}</p>
                <button onClick={handleGenerate} className="mt-6 text-cyan-400 hover:underline">Try again</button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col"
              >
                {/* Variant Selector Tabs */}
                {result?.llm_variants && (
                  <div className="flex gap-2 mb-4 p-1 bg-slate-900/50 rounded-xl border border-slate-800 w-fit">
                    {Object.keys(result.llm_variants).map((v) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedVariant === v
                          ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                          }`}
                      >
                        {v.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}

                <div className="glass-card overflow-hidden flex-1 flex flex-col">
                  <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-cyan-400" />
                      <span className="text-sm font-bold text-white">
                        {selectedVariant.charAt(0).toUpperCase() + selectedVariant.slice(1)} Version
                      </span>
                      {result?.llm_variants?.[selectedVariant]?.readability_score && (
                        <span className="text-[10px] bg-slate-900 border border-slate-700 text-slate-400 px-2 py-0.5 rounded-full ml-2">
                          Readability: {result.llm_variants[selectedVariant].readability_score.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium hover:bg-slate-800 transition-colors"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copied ? 'Copied' : 'Copy markdown'}
                    </button>
                  </div>
                  <div className="p-8 prose prose-invert prose-cyan max-w-none prose-h1:text-white prose-strong:text-cyan-400 prose-p:text-slate-300 flex-1 overflow-y-auto max-h-[700px]">
                    <ReactMarkdown>
                      {result?.llm_variants?.[selectedVariant]?.content || result?.llm_enhanced || ""}
                    </ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}