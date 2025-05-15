# NexLearn - Futuristic Learning Platform

NexLearn is a modern, interactive online learning and assessment platform built with Next.js, React, Redux Toolkit, and Framer Motion. It offers a seamless experience for students and professionals to take MCQ-based tests, manage their profiles, and view results with beautiful UI and smooth animations.

## Features

- **Modern UI/UX**: Responsive, attractive design with global and page-level animations using Framer Motion.
- **Authentication**: Secure OTP-based login and verification flow.
- **Profile Management**: Users can add and update their profile details and photo.
- **Exam Module**:
  - Fetches questions from a backend API.
  - Allows answering, marking for review, and navigating between questions.
  - Timer and auto-submit on time expiry.
  - Animated modals and feedback.
- **Result Page**: Shows detailed results with correct, incorrect, and not attended questions, all with smooth transitions.
- **State Management**: Uses Redux Toolkit for global state (test results, API base URL, etc.).
- **API Integration**: All backend calls use a configurable base URL from Redux.
- **Mobile Friendly**: Fully responsive for all device sizes.

## Tech Stack
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first styling)

## Getting Started
clone this repo
git clone https://github.com/kirank860/NextLearn.git
1. **Install dependencies:**
   ```bash
   npm install

   ```

2. **Run the development server:**
   ```bash
   npm run dev
 

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure
- `src/app/` - Main app pages (login, verify, test, result, etc.)
- `src/components/` - Reusable UI components (Header, ReduxProvider, ClientWrapper, etc.)
- `src/store/` - Redux slices and store setup
- `src/lib/` - Utility libraries (e.g., Firebase config)

## API Integration
- All API calls use the base URL stored in Redux (`https://nexlearn.noviindusdemosites.in`).
- Endpoints include:
  - `/auth/send-otp` (send OTP)
  - `/auth/verify-otp` (verify OTP)
  - `/auth/create-profile` (profile management)
  - `/question/list` (fetch questions)
  - `/answers/submit` (submit answers)
  - `/answers/result` (fetch results)(in the result page i added dummy data because i didn't received the endpoint in the doc)

## Animations & UX
- Global page transitions (fade/slide) using Framer Motion.
- Animated cards, forms, and buttons for login and verification.
- Micro-interactions for buttons and error messages.

