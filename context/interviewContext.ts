
'use client'

import { createContext, useContext } from "react";
export const InterviewContext = createContext<Interview[] | null>(null);
export const useInterview = () => useContext(InterviewContext);