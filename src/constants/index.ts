export const INITIAL_NEW_INCOME = {
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

export const INFO_TEXTS = {
  PEOPLE: {
    description: `Ajoutez et personnalisez le nom des personnes qui contribuent aux charges de votre foyer. Si plusieurs contributeurs sont présents, une jauge de pourcentage vous offre la possibilité de définir la part de contribution de chacun. Cette fonctionnalité est particulièrement utile lorsque vous sélectionnez le mode de répartition "Personnalisé", vous permettant de répartir les charges de manière spécifique.`,
  },

  INCOME: {
    description: `Ajoutez les revenus mensuels des personnes contribuant aux charges du foyer. Pour chaque revenu, vous pouvez définir son nom, son montant, l'attribuer à une personne spécifique et ajouter un commentaire. Par défaut, les revenus sont attribués au foyer, ce qui signifie que le montant sera réparti équitablement entre les membres du foyer lors des calculs.`,
    example: `Exemple : Bobby et Stacy sont mariés et ont un fils, Tommy. Bobby perçoit un salaire de 1000€, Stacy 1200€, et ils reçoivent 600€ d'allocations pour leur enfant. La bonne pratique serait donc de saisir un salaire d'un montant de 1000€ en sélectionnant "Bobby", un salaire de 1200€ en sélectionnant "Stacy", et des allocations de 600€ en sélectionnant "foyer".`,
  },

  SAVINGS: {
    description: `Ajoutez les montants mensuels que vous mettez de côté en épargne. Pour chaque épargne, vous pouvez personnaliser son nom, son montant, l'attribuer à une personne spécifique et ajouter un commentaire. Par défaut, l'épargne est attribuée au foyer, ce qui signifie que la somme sera répartie équitablement entre chaque membre du foyer lors des calculs.`,
    example: `Exemple : Bobby et Stacy sont prévoyants. Bobby épargne 50€ par mois sur un Livret A, Stacy met 80€ sur un PER, et ensemble ils économisent 100€ pour les futures études de Tommy. Vous devriez donc saisir une épargne "Livret A" de 50€ en sélectionnant "Bobby", une épargne "PER" de 80€ en sélectionnant "Stacy", et une épargne "Études Tommy" de 100€ en laissant l'attribution par défaut "foyer".`,
  },

  EXPENSES: {
    description: `Ajoutez les dépenses mensuelles du foyer ainsi que celles de chaque personne. Chaque dépense peut être personnalisée avec un nom, un montant, et attribuée à un individu spécifique. Par défaut, une dépense est associée au foyer, ce qui signifie que le montant sera réparti entre tous les membres selon le mode de répartition sélectionné. Pour faciliter la saisie, certaines dépenses courantes sont déjà pré-remplies.`,
    example: `Exemple : Bobby et Stacy ont plusieurs dépenses mensuelles. Ils partagent un loyer de 800€ et dépensent 30€ pour les croquettes de Minou, leur chat. Bobby a un abonnement personnel à son magazine favori, "Sciences et Vie", pour 15€ par mois, tandis que Stacy paie 30€ pour son abonnement au stade de rugby. Ainsi, vous devriez saisir une dépense intitulée "Loyer" de 800€ et "Croquettes" de 30€, toutes deux attribuées au "foyer", puis une dépense "Magazine" de 15€ pour Bobby et "Stade" de 30€ pour Stacy.`,
  },

  DISTRIBUTION: {
    description: `Choisissez parmi trois modes de répartition des charges :\n\n • Égalitaire : chaque personne contribue de manière égale aux charges du foyer, indépendamment des revenus.\n\n • Proportionnel : La contribution de chaque personne est calculée en fonction de ses revenus. Il est donc essentiel de saisir correctement les revenus pour garantir des calculs précis.\n\n • Personnalisé : Vous définissez manuellement la part de contribution de chaque personne grâce à la jauge personnalisée dans la section 'Personnes dans le foyer'. Les dépenses sont alors réparties en fonction des pourcentages que vous avez attribués.`,
    example: `\nNota Bene : les dépenses personnelles (affectées à une personne) ne sont pas impactées par le mode de répartition. Seules les dépenses dites communes (affectées au "foyer") sont concernées.`,
  },

  BUDGET: {
    description: `Cette section offre un récapitulatif détaillé de toutes les informations que vous avez saisies dans les autres rubriques. Elle affiche la contribution financière globale du foyer, ainsi que le détail pour chaque personne. Les montants affichés sont automatiquement ajustés en fonction du mode de répartition choisi et des données saisies, vous permettant d'avoir une vue d'ensemble précise des engagements financiers de chacun.`,
  },

  CHARTS: {
    description: `Visualisation graphique des contributions globales et individuelles, offrant une perspective claire sur la répartition financière au sein du foyer. Parfait pour les amateurs de camemberts (les graphiques, pas le fromage).`,
  },

  ANALYSE: {
    description: `Sur la base des données que vous avez saisies, l'outil génère une analyse sommaire de votre situation financière. Cet outil peut fournir des pistes d'amélioration simples, mais attention, il ne remplace en aucun cas les conseils d'un expert financier. Les résultats sont purement informatifs et peuvent vous donner des idées pour ajuster vos finances. Pour des conseils personnalisés, il est recommandé de consulter un professionnel !`,
  },
};
