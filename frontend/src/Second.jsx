import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useJob } from "./JobContext";
import { Plus, X, Search, Sparkles, ArrowLeft, ArrowRight, Check } from "lucide-react";

const COMMON_SKILLS = [
  "JavaScript", "Python", "React", "Node.js", "TypeScript",
  "FastAPI", "PostgreSQL", "MongoDB", "AWS",
  "Docker", "Git", "REST API", "GraphQL", "CI/CD", "Agile",
  "Tailwind CSS", "Redux", "Java", "Docker", "Kubernetes"
];

export default function Second() {
  const navigate = useNavigate();
  const { formData, addSkill, removeSkill } = useJob();
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = (skill) => {
    if (skill.trim()) {
      addSkill(skill.trim());
      setSkillInput("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="container mx-auto px-4 py-12 max-w-4xl"
    >
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-400"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">Select Key Skills</h1>
          <p className="text-slate-400">Choose 3-10 skills that are essential for this role</p>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Skill Selection Area */}
        <div className="glass-card p-8">
          <div className="space-y-8">
            {/* Input Row */}
            <div className="space-y-4">
              <label className="label-text">Add Custom Skill</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 text-slate-500" size={18} />
                  <input
                    className="input-field pl-10"
                    placeholder="Type a skill (e.g. AWS, Python, UI Design)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill(skillInput);
                      }
                    }}
                  />
                </div>
                <button
                  onClick={() => handleAddSkill(skillInput)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>
            </div>

            {/* Common Skills */}
            <div className="space-y-4">
              <label className="label-text flex items-center gap-2">
                <Sparkles size={14} className="text-amber-400" />
                Suggested Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_SKILLS.map((skill) => {
                  const isSelected = formData.key_skills.includes(skill);
                  return (
                    <motion.button
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => isSelected ? removeSkill(skill) : addSkill(skill)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 flex items-center gap-2 ${isSelected
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                          : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                        }`}
                    >
                      {skill}
                      {isSelected && <Check size={14} />}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Selected Skills List */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex justify-between items-end">
                <label className="label-text">Selected Skills</label>
                <span className={`text-xs font-mono py-1 px-2 rounded ${formData.key_skills.length >= 3 ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-500 bg-slate-800/50'
                  }`}>
                  {formData.key_skills.length} / 10
                </span>
              </div>
              <div className="min-h-[100px] p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50 flex flex-wrap gap-3 items-start">
                <AnimatePresence>
                  {formData.key_skills.length === 0 ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-slate-600 text-sm italic w-full text-center mt-6"
                    >
                      No skills selected yet. Select at least 3 to continue.
                    </motion.p>
                  ) : (
                    formData.key_skills.map((skill) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="group flex items-center gap-2 px-3 py-1.5 bg-cyan-500 text-slate-950 rounded-lg text-sm font-bold shadow-lg shadow-cyan-500/10"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:bg-slate-950/20 rounded-full p-0.5 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-12">
            <button
              onClick={() => navigate("/third")}
              disabled={formData.key_skills.length < 3}
              className="btn-primary flex items-center gap-2"
            >
              Continue to Culture
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}