export const INITIAL_PEOPLE = [
  { name: "Personne 1", percentage: 100, revenues: [] },
];

export const INITIAL_EXPENSES = [
  {
    id: 1,
    name: "Loyer",
    amount: undefined,
 
    assignedTo: "foyer",
    comments: "",
  },
  {
    id: 2,
    name: "Eau",
    amount: undefined,
    assignedTo: "foyer",
    comments: "",
  },
  {
    id: 3,
    name: "Électricité",
    amount: undefined,
    assignedTo: "foyer",
    comments: "",
  },
  {
    id: 4,
    name: "Internet",
    amount: undefined,
     assignedTo: "foyer",
    comments: "",
  },
];

export const INITIAL_NEW_REVENUE = {
  id: 0,
  name: "",
  amount: undefined,
  assignedTo: "foyer",
  comments: "",
};

export const INITIAL_NEW_SAVING = {
  id: 0,
  name: "",
  amount: undefined,
  assignedTo: "foyer",
  comments: "",
};
export const INITIAL_NEW_EXPENSE = {
  id: 0,
  name: "",
  amount: undefined,
  comments: "",
  assignedTo: "foyer",
};

export const INFO_TEXTS = {
  PEOPLE:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  REVENUES:
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  SAVINGS:
    "Cette section affiche votre épargne totale et vous permet de définir et suivre un objectif d'épargne.",
  EXPENSES:
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  DISTRIBUTION:
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  CONTRIBUTIONS:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  ANALYSE:
    "Cette section affiche votre épargne totale et vous permet de définir et suivre un objectif d'épargne.",
  CHART:
    "Cette section affiche votre épargne totale et vous permet de définir et suivre un objectif d'épargne.",
};