export function capitalizeFirstLetter(inputString) {
  if (typeof inputString !== "string" || inputString.length === 0) {
    return inputString;
  }

  return inputString[0].toUpperCase() + inputString.slice(1);
}

export function formatSize(sizeInBytes) {
  const KB = 1024;
  const MB = KB * 1024;

  if (sizeInBytes >= MB) {
    return `${(sizeInBytes / MB).toFixed(2)} Mo`;
  } else if (sizeInBytes >= KB) {
    return `${(sizeInBytes / KB).toFixed(2)} Ko`;
  } else {
    return `${sizeInBytes} B`;
  }
}

export function formaterDate(paramDate) {
  // Assurez-vous que la valeur fournie est une instance de Date

  const date = new Date(paramDate);
  // Obtenez les composants de la date (jour, mois, année)
  const jour = date.getDate();
  const mois = date.getMonth() + 1; // Les mois sont indexés à partir de zéro
  const annee = date.getFullYear();

  // Formatez la date au format dd.mm.yyyy
  const dateFormatee = `${jour < 10 ? "0" : ""}${jour}.${
    mois < 10 ? "0" : ""
  }${mois}.${annee}`;

  return dateFormatee;
}
