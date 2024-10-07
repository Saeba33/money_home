export const INITIAL_PEOPLE = [
  { name: "Personne 1", percentage: 100, revenues: [] },
];

export const INITIAL_EXPENSES = [
  {
    name: "Loyer",
    amountMonthly: undefined,
    amountYearly: undefined,
    assignedTo: "foyer",
    comments: "",
  },
  {
    name: "Eau",
    amountMonthly: undefined,
    amountYearly: undefined,
    assignedTo: "foyer",
    comments: "",
  },
  {
    name: "Électricité",
    amountMonthly: undefined,
    amountYearly: undefined,
    assignedTo: "foyer",
    comments: "",
  },
  {
    name: "Internet",
    amountMonthly: undefined,
    amountYearly: undefined,
    assignedTo: "foyer",
    comments: "",
  },
];

export const INITIAL_NEW_EXPENSE = {
  name: "",
  amountMonthly: undefined,
  amountYearly: undefined,
  comments: "",
  assignedTo: "foyer",
};

export const INITIAL_NEW_REVENUE = {
  name: "",
  amount: undefined,
  assignedTo: "foyer",
  comments: "",
};

export const INITIAL_NEW_SAVING = {
  name: "",
  amount: undefined,
  assignedTo: "foyer",
  comments: "",
};

export const FOYER = "foyer";

export const ERROR_MESSAGES = {
  INVALID_INPUT: "Entrée invalide. Veuillez entrer un nombre positif.",
  MISSING_FIELDS: "Veuillez remplir tous les champs obligatoires.",
};


export const INFO_TEXTS = {
  PEOPLE:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  INCOME:
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  EXPENSES:
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  DISTRIBUTION_MODE:
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  CONTRIBUTIONS:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  SAVINGS:
    "Cette section affiche votre épargne totale et vous permet de définir et suivre un objectif d'épargne.",
  ANALYSE:
    "Cette section affiche votre épargne totale et vous permet de définir et suivre un objectif d'épargne.",
  CHART:
    "Cette section affiche votre épargne totale et vous permet de définir et suivre un objectif d'épargne.",
};