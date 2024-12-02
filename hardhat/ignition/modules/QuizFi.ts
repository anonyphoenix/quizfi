import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const quizFiModule = buildModule("QuizFiModule", (m) => {
  const quizfi = m.contract("QuizFi");
  return { quizfi };
});

export default quizFiModule;
