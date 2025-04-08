# QuizFi

QuizFi is a learn-to-earn platform built with Next.js and TypeScript. It allows users to create and take quizzes.
Quiz creators can incentivize quiz takers to study by setting a prize for top performers.


## Online Demo

[https://app.quizfi.click](https://app.quizfi.click)


## Workflow

QuizFi is a fully functional quiz app deployed on EDUChain testnet. 

### Create Quiz

Anyone can create quizzes for free. Optionally, they can set a prize for top performers. Quizzes with a prize can be set as Public. Public quizzes are listed on the app home page. Payments are in EDU.

![](/presentation/create_quiz.png)

### Take Quiz

Everyone start a quiz at a given time and it ends for everyone when the time runs out. No one can submit answers after a quiz ends.

![](/presentation/take_quiz.png)

### View Statistics

Quiz creators can view statistics of their own quizzes. They can see a list of participants along with their scores and won prizes.

![](/presentation/statistics.png)

### View Reports

Quiz takers can get a quiz report when the quiz time is over.

![](/presentation/quiz_report.png)

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `pnpm install` to install all dependencies.
3. Setup MongoDB.
4. Run a static files server to serve quiz images.
5. Get a project ID from [Reown](https://reown.com) for wallet connection.
6. Create a file named `.env.local` and fill it according to the information in the next section.
7. Run `pnpm run dev` to start the development server.
8. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.


## .env.local Sample Content

```
MONGODB_URI=mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
MONGODB_DB=quizfi
IMAGE_STORAGE_PATH=/usr/share/quizfi/
NEXT_PUBLIC_REOWN_PROJECT_ID=abcdefghijklmnopqrstuvwxyz
NEXT_PUBLIC_ENV=development # (or production)
NEXT_PUBLIC_MAIN_URL=https://app.quizfi.click/
NEXT_PUBLIC_IMAGE_HOST_URL=https://img.quizfi.click/
ACCOUNT_PRIVATE_KEY=0x0123456789abcdef0123456789ABCDEF01234567
```


## Technologies Used

- React
- Next.js
- TypeScript
- MongoDB
- Hardhat
- Solidity
- Material-UI
- Nginx
