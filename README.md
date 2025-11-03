# Travel Planner

Travel Planner is a frontend-focused, AI-powered web application that generates personalized travel plans based on user input, including travel dates, destinations, and interests. Users receive optimized recommendations for sightseeing, popular events, restaurants, local tips, and transportation options. Plans can be exported as PDF files for offline use.

## Features

- **Travel Planning**: Generates personalized plans including sightseeing, local tips, weather forecasts, and popular events.
- **Multi-Stop Routes**: Connect multiple destinations and generate a seamless itinerary.
- **Dynamic Weather Forecasts**: Provides AI-based weather predictions to optimize daily plans.
- **Local Activities & Events**: Suggests concerts, theater performances, and other popular events during the trip.
- **Restaurant & Food Recommendations**: Shows popular and recommended dining spots near the user’s accommodation.
- **Transportation Guidance**: Recommends the best ways to reach the accommodation from airports, bus stations, or train stations.
- **Customizable PDF Output**: Generates a professional PDF with itinerary, maps, events, and local suggestions.
- **User Preferences**: Collects user interests, dietary preferences, and other customizations to refine recommendations.
- **Form Validation**: Ensures accurate and structured user input using React Hook Form and Zod.

## Technologies

- **React**: A JavaScript library for building interactive user interfaces, used to structure the frontend.  
- **TypeScript**: A statically typed superset of JavaScript that improves code quality and ensures type safety.  
- **Next.js**: A React framework that enables server-side rendering and static site generation, providing fast performance and SEO-friendly pages.  
- **Framer Motion**: A powerful animation library for React, used to create smooth and interactive animations for map routes, transitions, and UI elements.  
- **SCSS (Sass)**: A CSS preprocessor that allows the use of variables, nesting, and modular CSS, improving maintainability and consistency of styles.  
- **React Hook Form + Zod**: Used for managing and validating user input forms efficiently.   
- **@react-pdf/renderer, jsPDF, html2canvas**: Libraries for generating professional, customizable PDF travel plans.  
- **i18next, next-i18next, react-i18next**: Internationalization libraries for supporting multiple languages and localized content.  
- **Radix UI (@radix-ui/react-dropdown-menu, popover, tooltip, form, slot)**: Component libraries for accessible and reusable UI elements.  
- **React Icons, @iconify/react**: Icon libraries used to enhance the visual design and user experience.  
- **React Hot Toast**: A notification library used to provide feedback to users in real-time.  
- **Swiper**: A library used for interactive sliders and carousel components in the UI.  
- **date-fns**: A utility library for managing and formatting dates within the application.  
- **clsx, class-variance-authority**: Utility libraries for handling conditional classNames and styling variants.  
- **LocalStorage**: Used to persist user preferences, previous searches, or partially completed travel plans across sessions.  
- **Context API**: Used for global state management, sharing user selections, travel data, and plan details across components.  
- **ESLint + eslint-config-next**: Tools to enforce code standards and prevent potential bugs during development.

## Clone the Repository

To clone the project, run the following commands:

```
git clone https://github.com/mehmetbacik/travel-planner.git
```
```
cd travel-planner
```

## Installation and Running

Install the necessary dependencies and start the local server:

```
npm install
```

```
npm run dev
```

Open http://localhost:3000 in your browser to view the project.

```
http://localhost:3000
```


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy

For a detailed exploration of the project, you can visit the [deployed site here](https://travel-planner-one-ochre.vercel.app/).

## GitHub Page

GitHub Repository: [https://github.com/mehmetbacik/travel-planner.git](https://github.com/mehmetbacik/travel-planner.git).

## License

This project is open-source and available under the MIT License.

## Contributions

If you wish to contribute to the project, please open a pull request. Any contributions and feedback are welcome!
