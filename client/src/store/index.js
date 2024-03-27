import {configureStore} from '@reduxjs/toolkit';

import loginReducer from "./LoginSlice";
import accountReducer from "./AccountSlice";
import educationReducer from "./EducationSlice";
import experienceReducer from "./ExperienceSlice";
import projectReducer from "./ProjectSlice";
import skillReducer from "./SkillSlice";
import certficateReducer from "./CertificateSlice";
import linkReducer from "./LinkSlice";

const store=configureStore({
    reducer:{
        login: loginReducer,
        account: accountReducer,
        education: educationReducer,
        experience: experienceReducer,
        project: projectReducer,
        skill: skillReducer,
        certificate: certficateReducer,
        link: linkReducer,
    }
});

export default store;