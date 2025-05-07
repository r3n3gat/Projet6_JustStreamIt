# JustStreamIt - Projet Développeur d'application JavaScript

Bienvenue sur le projet **JustStreamIt** !  
Il s'agit d'un site web de notation et classement de vidéos à la demande.

---

## Fonctionnalités principales

- Chargement dynamique des films depuis l'API locale **OCMovies-API**.
- Affichage du meilleur film avec ses détails.
- Liste des films les mieux notés et par genre sélectionné.
- Système de "Voir plus / Voir moins" selon la taille de l'écran.
- Ouverture d'une modale Bootstrap pour les détails de chaque film.
- Interface responsive pour Mobile / Tablette / Desktop.
- Utilisation de JavaScript moderne (ESModules, async/await, Fetch API).

---

## Technologies utilisées

- HTML5 (structure sémantique)
- CSS3 (Variables CSS, Mobile First)
- JavaScript ES6+ (Modules, async/await)
- Bootstrap 5.3
- Live-server (développement local)
- CleanCSS et Terser (minification)

---

## Installation et lancement du projet

### 1. Cloner ce dépôt

\`\`\`bash
git clone https://https://github.com/r3n3gat/Projet6_JustStreamIt.git
cd juststreamit
\`\`\`

### 2. Installer et lancer l'API locale OCMovies

\`\`\`bash
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
cd OCMovies-API-EN-FR
uvicorn main:app --reload
\`\`\`

L'API sera disponible sur :  
http://127.0.0.1:8000/api/v1/

---

### 3. Construire et démarrer le projet

Depuis la racine du projet :

\`\`\`bash
./start.sh
\`\`\`

Cela effectuera automatiquement :
- L'ouverture du site dans votre navigateur via **live-server**.

Le site sera accessible à une URL du type :  
http://127.0.0.1:8080/index_bootstrap.html

Fonction annexe du "start.sh" : lancer le "build.sh" pour la preparation à la production
- Nettoyage de l'ancien build (\`dist/\`),
- Minification des fichiers CSS et JS,

---
## 📂 Arborescence du projet

```text
/frontend
├── assets/
│   └── favicon.png
│   └── logo.png
├── css/
│   ├── variables.css
│   ├── style.css
│   └── modal.css
├── js/
│   ├── api.js
│   ├── utils.js
├── modules/
│   ├── bestMovie.js
│   ├── movieByGenre.js
│   ├── genres.js
│   ├── modal.js
│   ├── toggle.js
│   └── ui.js
├── index_bootstrap.html
├── main.js
├── build.sh
├── start.sh
└── README.md
```
---

## ✨ Informations supplémentaires

- L'intégration visuelle suit les maquettes Figma fournies.
- Toutes les données sont chargées dynamiquement depuis l'API locale.
- Le site est conçu en **Mobile First** et est responsive.
- Les erreurs réseau/API sont gérées proprement côté client.

---

## 👨‍💻 Auteur

Projet réalisé par **Stevi ENOTO** (alias r3n3gat)  
© 2025 - Tous droits réservés

---

## 📝 Remarques

- Ce projet est prévu pour fonctionner exclusivement avec l'API locale OCMovies-API-EN-FR.
- Le projet utilise un serveur local de développement rapide grâce à **live-server**.
- Un dossier `/dist/` est automatiquement généré pour contenir la version compressée et optimisée du projet en vue d'une prochaine mise en production.