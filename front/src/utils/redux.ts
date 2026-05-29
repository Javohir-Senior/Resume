import { configureStore, createSlice } from "@reduxjs/toolkit";
import { crudApi } from "./query";

const crudSlice = createSlice({
  name: "crud",
  initialState: {
    user: { name: "", phone: "", password: "" },
    resume: {
      userId: "",
      fullName: "",
      phone: "",
      gitHub: "",
      address: "",
      email: "",
      partfolio: "",
      jobTitle: "",
      LinkkeyIn: "",
      summary: "",
      experiences: [],
      languages: [],
      projects: [],
      education: [],
      skills: [],
    },
    exp: {
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
    pro: {
      projectName: "",
      liveLink: "",
      repoLink: "",
      description: "",
    },
    edu: {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: "",
    },
    skils: {
      category: "",
      skillList: "",
    },
    lan: {
      language: "",
      level: "",
    },
  },
  reducers: {
    // --- USER ---
    getName: (state, action) => {
      state.user.name = action.payload;
    },
    getPhone: (state, action) => {
      state.user.phone = action.payload;
    },
    getPass: (state, action) => {
      state.user.password = action.payload;
    },

    // --- RESUME MAIN ---
    getFullName: (state, action) => {
      state.resume.fullName = action.payload;
    },
    getPhone2: (state, action) => {
      state.resume.phone = action.payload;
    },
    getGitHub: (state, action) => {
      state.resume.gitHub = action.payload;
    },
    getAddress: (state, action) => {
      state.resume.address = action.payload;
    },
    getEmail: (state, action) => {
      state.resume.email = action.payload;
    },
    getPartfolio: (state, action) => {
      state.resume.partfolio = action.payload;
    },
    getJobTitle: (state, action) => {
      state.resume.jobTitle = action.payload;
    },
    getLinkkeyIn: (state, action) => {
      state.resume.LinkkeyIn = action.payload;
    },
    getSummary: (state, action) => {
      state.resume.summary = action.payload;
    },

    // --- EXPERIENCE ---
    getCompany: (state, action) => {
      state.exp.company = action.payload;
    },
    getRole: (state, action) => {
      state.exp.role = action.payload;
    },
    getLocation: (state, action) => {
      state.exp.location = action.payload;
    },
    getStartDate: (state, action) => {
      state.exp.startDate = action.payload;
    },
    getEndDate: (state, action) => {
      state.exp.endDate = action.payload;
    },
    getDescription: (state, action) => {
      state.exp.description = action.payload;
    },

    // --- PROJECTS ---
    getProjectName: (state, action) => {
      state.pro.projectName = action.payload;
    },
    getLiveLink: (state, action) => {
      state.pro.liveLink = action.payload;
    },
    getRepoLink: (state, action) => {
      state.pro.repoLink = action.payload;
    },
    getProjectDescription: (state, action) => {
      state.pro.description = action.payload;
    },

    // --- EDUCATION ---
    getInstitution: (state, action) => {
      state.edu.institution = action.payload;
    },
    getDegree: (state, action) => {
      state.edu.degree = action.payload;
    },
    getFieldOfStudy: (state, action) => {
      state.edu.fieldOfStudy = action.payload;
    },
    getEduStartDate: (state, action) => {
      state.edu.startDate = action.payload;
    },
    getEduEndDate: (state, action) => {
      state.edu.endDate = action.payload;
    },
    getEduDescription: (state, action) => {
      state.edu.description = action.payload;
    },

    // --- SKILLS ---
    getSkillCategory: (state, action) => {
      state.skils.category = action.payload;
    },
    getSkillList: (state, action) => {
      state.skils.skillList = action.payload;
    },

    // --- LANGUAGES ---
    getLanguageName: (state, action) => {
      state.lan.language = action.payload;
    },
    getLanguageLevel: (state, action) => {
      state.lan.level = action.payload;
    },

    addExperience: (state) => {
      state.resume.experiences.push({ ...state.exp });
      state.exp = {
        company: "",
        role: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      };
    },
    addProject: (state) => {
      state.resume.projects.push({ ...state.pro });
      state.pro = {
        projectName: "",
        liveLink: "",
        repoLink: "",
        description: "",
      };
    },
    addEducation: (state) => {
      state.resume.education.push({ ...state.edu });
      state.edu = {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        description: "",
      };
    },
    addSkill: (state) => {
      state.resume.skills.push({ ...state.skils });
      state.skils = { category: "", skillList: "" };
    },
    addLanguage: (state) => {
      state.resume.languages.push({ ...state.lan });
      state.lan = { language: "", level: "" };
    },
    ExpdelItem: (state, action) => {
      state.resume.experiences.splice(action.payload, 1);
    },
    LandelItem: (state, action) => {
      state.resume.languages.splice(action.payload, 1);
    },
    SkildelItem: (state, action) => {
      state.resume.skills.splice(action.payload, 1);
    },
    EdudelItem: (state, action) => {
      state.resume.education.splice(action.payload, 1);
    },
    ProdelItem: (state, action) => {
      state.resume.projects.splice(action.payload, 1);
    },
    setUserId: (state, action) => {
      state.resume.userId = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    crud: crudSlice.reducer,
    [crudApi.reducerPath]: crudApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(crudApi.middleware),
});

export const actions = { ...crudSlice.actions };
