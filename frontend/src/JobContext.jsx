import React, { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        job_title: '',
        company_name: '',
        industry: '',
        experience_level: '',
        key_skills: [],
        company_culture: '',
        special_requirements: ''
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateFormData = (newData) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };

    const addSkill = (skill) => {
        if (skill && !formData.key_skills.includes(skill) && formData.key_skills.length < 10) {
            setFormData((prev) => ({
                ...prev,
                key_skills: [...prev.key_skills, skill]
            }));
        }
    };

    const removeSkill = (skill) => {
        setFormData((prev) => ({
            ...prev,
            key_skills: prev.key_skills.filter((s) => s !== skill)
        }));
    };

    return (
        <JobContext.Provider value={{
            formData,
            updateFormData,
            addSkill,
            removeSkill,
            result,
            setResult,
            loading,
            setLoading
        }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJob = () => {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error('useJob must be used within a JobProvider');
    }
    return context;
};
