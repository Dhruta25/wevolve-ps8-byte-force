import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useJob } from "./JobContext";
import { Briefcase, Building2, MapPin, Sparkles, ArrowRight } from "lucide-react";

export default function Firstpage() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useJob();

  const handleNext = () => {
    navigate("/second");
  };

  const isFormValid =
    formData.job_title.trim() !== "" &&
    formData.company_name.trim() !== "" &&
    formData.industry !== "" &&
    formData.experience_level !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-12 max-w-6xl"
    >
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-6"
        >
          <Sparkles size={16} />
          <span className="text-sm font-medium tracking-wide">AI-Powered Generator</span>
        </motion.div>
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-slate-400 mb-4">
          Create Perfect Job Descriptions
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Craft professional, industry-standard job descriptions in seconds using advanced AI.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Form */}
        <div className="glass-card p-8 space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
              1
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-none">Basic Details</h2>
              <p className="text-slate-500 text-sm mt-1">Foundational info for your JD</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="label-text">Job Title</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 text-slate-500" size={18} />
                <input
                  className="input-field pl-10"
                  placeholder="e.g. Senior Backend Engineer"
                  value={formData.job_title}
                  onChange={(e) => updateFormData({ job_title: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="label-text">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 text-slate-500" size={18} />
                <input
                  className="input-field pl-10"
                  placeholder="e.g. Wevolve"
                  value={formData.company_name}
                  onChange={(e) => updateFormData({ company_name: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text">Industry</label>
                <select
                  className="input-field"
                  value={formData.industry}
                  onChange={(e) => updateFormData({ industry: e.target.value })}
                >
                  <option value="">Select industry</option>
                  <option value="fintech">Fintech</option>
                  <option value="software">Software</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="ecommerce">E-commerce</option>
                </select>
              </div>
              <div>
                <label className="label-text">Experience</label>
                <select
                  className="input-field"
                  value={formData.experience_level}
                  onChange={(e) => updateFormData({ experience_level: e.target.value })}
                >
                  <option value="">Select level</option>
                  <option value="entry">Entry (0-2y)</option>
                  <option value="mid">Mid-Level (3-5y)</option>
                  <option value="senior">Senior (5y+)</option>
                  <option value="lead">Lead/Architect</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!isFormValid}
            className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
          >
            Continue to Skills
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Right Side: Preview Card */}
        <div className="lg:sticky lg:top-12">
          <div className="glass-card overflow-hidden">
            <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">Live Preview</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              </div>
            </div>
            <div className="p-8 min-h-[400px] flex flex-col justify-center text-center">
              {!formData.job_title && !formData.company_name ? (
                <div className="space-y-4 opacity-50">
                  <div className="w-24 h-24 bg-slate-800 rounded-2xl mx-auto flex items-center justify-center">
                    <Briefcase size={40} className="text-slate-600" />
                  </div>
                  <p className="text-slate-500">Start typing to see your job description take shape...</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-left space-y-6"
                >
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {formData.job_title || "Position Title"}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-slate-400">
                      <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full text-sm">
                        <Building2 size={14} className="text-cyan-400" />
                        {formData.company_name || "Company"}
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full text-sm">
                        <MapPin size={14} className="text-cyan-400" />
                        {formData.industry ? formData.industry.charAt(0).toUpperCase() + formData.industry.slice(1) : "Industry"}
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-800" />

                  <div className="space-y-3">
                    <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-slate-800 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-slate-800 rounded animate-pulse" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}