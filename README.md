# Club GIT (anciennement Club Génie) - Frontend

Bienvenue sur le dépôt Frontend de **Club GIT**, une plateforme moderne et complète de gestion de club universitaire ou d'association. Ce projet offre une interface utilisateur haut de gamme basée sur un design "Premium Dark Mode" et "Glassmorphism".

## 🚀 Fonctionnalités Principales

Le système est conçu autour d'un accès basé sur les rôles, offrant des fonctionnalités spécifiques à chaque type d'utilisateur :

*   **Public (Non connecté)**
    *   **Landing Page :** Présentation du club et inscription.
    *   **Vitrine :** Découverte des projets, événements et réalisations du club.
    *   **Gamification :** Explication du système de points et de récompenses.
*   **Membres**
    *   Tableau de bord personnalisé (Dashboard).
    *   Consultation et gestion des tâches assignées.
    *   Suivi des présences via scan de QR Code.
    *   Suivi du score de gamification et classement.
    *   Candidatures aux projets et suivi des participations.
    *   Accès aux groupes de discussion et au forum du club.
*   **Chefs de Projet**
    *   Gestion complète de leurs projets.
    *   Création, assignation et suivi des tâches du projet.
    *   Validation des présences spécifiques au projet.
*   **Censeurs**
    *   Génération de QR Codes dynamiques pour la prise de présence lors des réunions ou événements.
    *   Gestion et suivi des membres.
    *   Attribution et suivi des infractions.
*   **Administrateurs**
    *   Validation et gestion des nouvelles inscriptions.
    *   Gestion globale des utilisateurs et des rôles.
    *   Création et gestion des groupes.
    *   Consultation des statistiques détaillées du club.

## 🛠️ Stack Technique

Ce projet utilise des technologies modernes pour garantir des performances optimales et une expérience utilisateur fluide (PWA incluse).

*   **Framework :** React 19
*   **Build Tool :** Vite 8
*   **Routage :** React Router DOM v7
*   **Style :** Tailwind CSS v4 (PostCSS, Autoprefixer)
*   **State Management :** Zustand
*   **Requêtes HTTP :** Axios
*   **Icônes :** Lucide React
*   **Fonctionnalités QR Code :** `html5-qrcode`, `qrcode.react`
*   **PWA :** `vite-plugin-pwa`

## 🎨 Design & UI

L'interface de Club GIT met l'accent sur l'esthétique et l'expérience utilisateur :
*   **Premium Dark Mode :** Un thème sombre élégant et reposant pour les yeux.
*   **Glassmorphism :** Utilisation d'effets de transparence, de flou d'arrière-plan et de bordures subtiles pour donner de la profondeur à l'interface.
*   **Responsive Design :** Entièrement adapté aux mobiles, tablettes et ordinateurs de bureau.
*   **PWA (Progressive Web App) :** Installable sur mobile avec navigation optimisée.

## 📦 Installation & Démarrage local

Pour exécuter ce projet localement, suivez ces étapes :

### Prérequis
*   [Node.js](https://nodejs.org/) (version 18+ recommandée)
*   Un gestionnaire de paquets comme `npm` ou `yarn`

### Étapes

1.  **Cloner le dépôt :**
    ```bash
    git clone <votre-url-de-repo>
    cd club-genie-front
    ```

2.  **Installer les dépendances :**
    ```bash
    npm install
    ```

3.  **Configuration de l'environnement :**
    Créez un fichier `.env` à la racine du projet en vous basant sur un éventuel `.env.example` et configurez l'URL de l'API Laravel (ex: `VITE_API_URL=http://localhost:8000/api`).

4.  **Démarrer le serveur de développement :**
    ```bash
    npm run dev
    ```
    L'application sera accessible (généralement sur `http://localhost:5173`).

## 📜 Scripts Disponibles

*   `npm run dev` : Démarre le serveur de développement avec rechargement à chaud (HMR).
*   `npm run build` : Compile l'application pour la production dans le dossier `dist`.
*   `npm run lint` : Exécute ESLint pour analyser le code et trouver des problèmes potentiels.
*   `npm run preview` : Démarre un serveur local pour prévisualiser le build de production.

## 🤝 Contribution

Si vous souhaitez contribuer à l'amélioration de ce frontend :
1. Forkez le projet.
2. Créez votre branche de fonctionnalité (`git checkout -b feature/IncroyableFonctionnalite`).
3. Commitez vos changements (`git commit -m 'Ajout d'une Incroyable Fonctionnalité'`).
4. Poussez vers la branche (`git push origin feature/IncroyableFonctionnalite`).
5. Ouvrez une Pull Request.
