import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const URI: string = "https://quizfi.click/api/get-badge-by-id?id={id}";

const quizFiModule = buildModule("QuizFiModule", (m) => {
  //const uri = m.getParameter("_uri", URI);

  const quizfi = m.contract("QuizFi"); //, [uri]);

  return { quizfi };
});

export default quizFiModule;
