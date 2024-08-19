# QuizFi

QuizFi is a learn-to-earn platform built with Next.js and TypeScript. It allows users to create and take quizzes.
Quiz creators can incentivize quiz takers to study by setting a prize for top performers.


## Online Demo

[https://quizfi.click](https://quizfi.click)


## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `pnpm install` to install all dependencies.
3. Install MongoDB.
4. Create a file named `.env.local` and fill it according to the information in the next section.
5. Run `pnpm run dev` to start the development server.
6. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.


## .env.local Sample Content

```
MONGODB_URI=mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
MONGODB_DB=quizfi
```


## Technologies Used

- React JS
- Next.js
- TypeScript
- MongoDB
- Material-UI
