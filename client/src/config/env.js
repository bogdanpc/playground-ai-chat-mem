export const getEnvVar = (label, defaultVal = "") => {
    const str = "VITE_" + label;
    return import.meta.env[str] || defaultVal;
};
