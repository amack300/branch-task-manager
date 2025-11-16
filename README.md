# Branch Task Manager

This is a [Next.js](https://nextjs.org) react project featuring a UI based on [Shadcn UI](https://ui.shadcn.com/docs) and [Tailwind CSS](https://tailwindcss.com/).  [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) is also used to persist state managament in localStorage.

![Model](https://github.com/amack300/branch-task-manager/blob/master/screenshot.png)

## Getting Started

First, navigate to the root of the project, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

For testing the applicaiton, run either of the below commands.

```bash
npm run test
# or
npm run test:coverage
```

## Background

In order to demonstrate Anthony Mack's ability to create a simple To-Do application, I needed a good foundation for the project.  That is where Next.js comes in.  It has React baked in as well as the infamous `App` Router that easily integreates a Router.  In this case, the application is used within a single route, but it can easily be expanded.  I tend to like the enforced file structure for layout and page template files, see [this](https://nextjs.org/docs/app) for more information.  

Jerad mentioned that Branch is currently using Shadcn UI/Tailwind for the UI, so I used that as a base.  All custom templates are stored in `./components/app/*` along with their associated unit tests.  

In order to persist the `To-Do` data, I chose to use Zustand to store the state management in localStorage.