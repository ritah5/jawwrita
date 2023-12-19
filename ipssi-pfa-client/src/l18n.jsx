import {
  HiChartBar,
  HiOutlineChartBar,
  HiOutlineHome,
  HiHome,
  HiCog6Tooth,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

export const toasterData = {
  error: "Une erreur est survenue.",
  putSuccess: "Fichier ajouté avec succès.",
  deletedSuccess: "Fichier supprimé avec succès.",
  loading: "Chargement...",
};
export const errorData = {
  error: "Une erreur est survenue.",
};

export const navbarData = {
  links: [
    {
      icon: <HiHome size={24} />,
      fat_icon: <HiHome size={32} />,
      name: "Dashboard",
      path: "/",
    },
    {
      icon: <HiChartBar size={24} />,
      fat_icon: <HiChartBar size={32} />,
      name: "Statistiques",
      path: "/stats",
    },
    {
      icon: <HiCog6Tooth size={24} />,
      fat_icon: <HiCog6Tooth size={32} />,
      name: "Paramètres",
      path: "/settings",
    },
  ],
};

export const headerData = {
  login: "Connexion",
  register: "Inscription",
  logout: "Se déconnecter",
  myAccount: "Mon compte",
};

export const dashboardData = {
  title: "Bonjour",
  dropFile: "Déposez votre fichier ici",
  loading: "Chargement...",
  format: "N'importe quel format",
  chooseFile: "Ou choisissez un fichier",
  maxLength: "5 Mo max",
  files: "Fichiers",
  noFiles: "Aucun fichier ajouté.",
  saveFiles: "Sauvegarder les fichiers",
};

export const MyAccountData = {
  title: "Mon compte",
  comment: "Un commentaire à nous envoyer ?",
  send: "Envoyer",
  edit: "Modifier",
  email: "E-mail",
  giga: "Go",
  euro: "EUR",
  goTo: "Passer à",
  currentStorage: "Stockage actuel",
  firstname: "Prénom",
  lastname: "Nom",
  editPassword: "Modifier mon mot de passe",
  oldPassword: "Ancien mot de passe",
  newPassword: "Nouveau mot de passe",
  confirmPassword: "Confirmer le nouveau mot de passe",
};

export const registrationData = {
  login: "Connexion",
  register: "Inscription",
  emailPlaceholder: "Entrez votre e-mail",
  firstnamePlaceholder: "Entrez votre prénom",
  lastnamePlaceholder: "Entrez votre nom",
  passwordPlaceholder: "Mot de passe",
  alreadySignedIn: "Déjà inscrit ?",
  notSignedIn: "Pas encore inscrit ?",
  forgottenPassword: "Mot de passe oublié ?",
  missingFields: "Il manque un ou plusieurs champs.",
  emailRegex: "Veuillez entrer une adresse mail valide.",
  invalidCredentials: "Email ou mot de passe incorrect.",
  alreadyUsedMail: "Cet e-mail est déjà utilisé.",
  passwordRegex:
    "Mot de passe invalide, il doit contenir au moins un nombre, une lettre et 8 caractères.",
  btn: {
    login: "Se connecter",
    register: "S'inscrire",
  },
};
