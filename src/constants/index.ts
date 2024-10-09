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
  PEOPLE: {
    description:
      "Ajoutez et personnalisez le nom des personnes qui contribuent aux charges de votre foyer. Si plusieurs contributeurs sont présents, une jauge de pourcentage permet de définir la part de contribution de chacun. Cette fonctionnalité est particulièrement utile lorsque vous sélectionnez le mode de répartition 'Personnalisé', afin de répartir les charges de manière équitable ou selon les capacités de chacun.",
  },

  REVENUES: {
    description:
      "Ajoutez les revenus mensuels des personnes contribuant aux charges du foyer. Pour chaque revenu, vous pouvez définir son nom, son montant et l'attribuer à une personne spécifique. Par défaut, les revenus sont affectés au foyer, ce qui signifie que le montant sera divisé équitablement entre les membres du foyer dans les calculs.",
    example:
      "Bobby et Stacy sont mariés avec un enfant, Tommy. Bobby gagne un salaire de 1000 €, Stacy 1200 €, et ils reçoivent 600 € d'allocations familiales. Saisissez :\n- Salaire de Bobby : 1000 €\n- Salaire de Stacy : 1200 €\n- Allocations familiales : 600 € (attribué au Foyer)\nN'oubliez pas d'ajouter un commentaire du genre 'Merci patron !' pour le salaire si vous êtes d'humeur joyeuse.",
  },

  SAVINGS: {
    description:
      "Ajoutez les montants mensuels que vous mettez de côté en épargne. Vous pouvez personnaliser le nom de l'épargne, son montant, et l'attribuer à une personne. Par défaut, l'épargne est affectée au foyer, ce qui implique que la somme sera déduite de manière égale pour chaque membre du foyer dans les calculs.",
    example:
      "Bobby et Stacy sont des fourmis prévoyantes. Bobby place 50 € sur son Livret A, Stacy 80 € sur son PER, et ensemble ils épargnent 100 € pour les futures études de Tommy (qui sera sûrement un génie). Saisissez :\n- Livret A de Bobby : 50 €\n- PER de Stacy : 80 €\n- Compte études de Tommy : 100 € (attribué au Foyer)\nAjoutez un commentaire 'Pour quand Tommy sera président' si vous êtes optimiste !",
  },

  EXPENSES: {
    description:
      "Ajoutez les dépenses mensuelles du foyer ainsi que celles de chaque personne. Chaque dépense peut être personnalisée avec un nom, un montant et attribuée à une personne. Par défaut, une dépense est affectée au foyer, ce qui signifie que le montant sera réparti équitablement entre tous les membres. Pour vous simplifier la saisie, certaines dépenses courantes sont déjà préremplies.",
    example:
      "Bobby et Stacy ont des dépenses variées. Ils paient un loyer de 800 € et des croquettes pour leur chat Minou (qui mange comme quatre) à 30 €. Bobby est fan de 'Sciences et Vie' (15 € par mois), tandis que Stacy supporte son équipe de rugby (30 € par mois). Saisissez :\n- Loyer : 800 € (Foyer)\n- Croquettes pour Minou : 30 € (Foyer)\n- Abonnement 'Sciences et Vie' : 15 € (Bobby)\n- Abonnement stade de rugby : 30 € (Stacy)\nN'hésitez pas à ajouter un commentaire 'Minou nous ruine !' pour les croquettes.",
  },

  DISTRIBUTION: {
    description:
      "Choisissez entre trois modes de répartition des charges :\n1. Égalitaire : Chaque personne contribue de manière égale aux charges du foyer, indépendamment des revenus.\n2. Proportionnel : La contribution de chaque personne est calculée en fonction de ses revenus. Il est donc important de saisir correctement les revenus pour éviter des erreurs dans les calculs.\n3. Personnalisé : Vous définissez manuellement la part de contribution de chaque personne grâce à la jauge personnalisée dans la section 'Personnes'. Les dépenses sont alors réparties en fonction des pourcentages que vous avez attribués.",
  },

  CONTRIBUTIONS: {
    description:
      "Cette section offre un récapitulatif détaillé de toutes les informations que vous avez saisies dans les autres rubriques. Elle affiche la contribution financière globale du foyer, ainsi que le détail pour chaque personne. Les montants affichés sont automatiquement ajustés en fonction du mode de répartition choisi et des données saisies, vous permettant d'avoir une vue d'ensemble précise des engagements financiers de chacun.",
  },

  CHARTS: {
    description:
      "Visualisation graphique des contributions globales et individuelles, offrant une perspective claire sur la répartition financière au sein du foyer. Parfait pour les amateurs de camemberts (les graphiques, pas le fromage).",
  },

  ANALYSE: {
    description:
      "Sur la base des données que vous avez saisies, l'outil génère une analyse sommaire de votre situation financière. Cet outil peut fournir des pistes d'amélioration simples, mais attention, il ne remplace en aucun cas les conseils d'un expert financier. Les résultats sont purement informatifs et peuvent vous donner des idées pour ajuster vos finances, mais pour des conseils personnalisés, il est recommandé de consulter un professionnel. N'utilisez pas ces conseils pour jouer en bourse, acheter des cryptomonnaies ou parier sur les courses de chevaux !",
  },
};
