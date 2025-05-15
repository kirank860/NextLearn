import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestResultState {
  totalQuestions: number;
  correct: number;
  incorrect: number;
  notAttended: number;
  marks: number;
  examHistoryId?: string;
  isMock?: boolean;
  baseUrl: string;
}

const initialState: TestResultState = {
  totalQuestions: 0,
  correct: 0,
  incorrect: 0,
  notAttended: 0,
  marks: 0,
  examHistoryId: '',
  isMock: false,
  baseUrl: 'https://nexlearn.noviindusdemosites.in',
};

const testResultSlice = createSlice({
  name: 'testResult',
  initialState,
  reducers: {
    setTestResult(state, action: PayloadAction<Omit<TestResultState, 'baseUrl'>>) {
      return { ...state, ...action.payload };
    },
    clearTestResult() {
      return initialState;
    },
    setBaseUrl(state, action: PayloadAction<string>) {
      state.baseUrl = action.payload;
    },
  },
});

export const { setTestResult, clearTestResult, setBaseUrl } = testResultSlice.actions;
export const selectBaseUrl = (state: { testResult: TestResultState }) => state.testResult.baseUrl;
export default testResultSlice.reducer; 