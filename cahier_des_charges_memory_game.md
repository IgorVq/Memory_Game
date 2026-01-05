# 📘 Cahier des charges

## Projet JavaScript / TypeScript -- Memory Game

------------------------------------------------------------------------

## 1️⃣ Contexte

Vous travaillez pour une petite entreprise qui souhaite proposer un
**jeu de Memory** jouable directement dans le navigateur, sans
framework.

Ce projet a un double objectif : 1. Réaliser une application
**fonctionnelle et bien structurée en JavaScript** 2. Migrer ensuite
cette application en **TypeScript** afin d'en améliorer la robustesse et
la maintenabilité

------------------------------------------------------------------------

## 2️⃣ Objectifs pédagogiques

-   Structurer un projet JavaScript
-   Séparer la logique métier et l'interface
-   Manipuler le DOM
-   Gérer l'état d'une application
-   Comprendre l'intérêt du typage avec TypeScript
-   Refactoriser un projet existant

------------------------------------------------------------------------

## 3️⃣ Description du jeu

Le jeu est un **Memory** classique :

-   Des cartes sont disposées face cachée
-   Chaque carte existe en **paire**
-   Le joueur retourne deux cartes
-   Si elles correspondent, elles restent visibles
-   Sinon, elles se retournent après un court délai
-   La partie se termine lorsque toutes les paires sont trouvées

------------------------------------------------------------------------

## 4️⃣ Règles de fonctionnement

-   Maximum **deux cartes retournées simultanément**
-   Une carte trouvée ne peut plus être cliquée
-   Le nombre de coups est comptabilisé
-   Un chronomètre démarre au lancement de la partie
-   Fin automatique de la partie

------------------------------------------------------------------------

## 5️⃣ Fonctionnalités obligatoires -- Phase 1 (JavaScript)

### Jeu

-   Génération et mélange des cartes
-   Gestion des retournements
-   Vérification des paires
-   Détection de fin de partie

### Interface

-   Grille de jeu
-   Nombre de coups
-   Temps écoulé
-   Message de victoire

------------------------------------------------------------------------

## 6️⃣ Contraintes techniques

-   JavaScript ES6+
-   Pas de framework
-   Pas de canvas
-   Modules ES6 obligatoires
-   Aucune variable globale

------------------------------------------------------------------------

## 7️⃣ Architecture imposée

``` text
src/
│── main.js
│── game/
│   ├── gameState.js
│   ├── gameLogic.js
│   └── gameConfig.js
│── ui/
│   ├── boardUI.js
│   └── statsUI.js
│── utils/
│   └── shuffle.js
```

------------------------------------------------------------------------

## 8️⃣ Modèle de données attendu

### Carte

-   id
-   value
-   isFlipped
-   isMatched

### État du jeu

-   cards
-   flippedCards
-   moves
-   startTime
-   status

------------------------------------------------------------------------

## 9️⃣ Phase 2 -- Migration TypeScript

-   Conversion des fichiers `.js` en `.ts`
-   Création des interfaces et enums
-   Typage strict (aucun `any`)
-   Compilation vers `/dist`

------------------------------------------------------------------------

## 🔟 Fonctionnalités bonus

-   Bouton rejouer
-   Niveaux de difficulté
-   Sauvegarde du score
-   Thème graphique

------------------------------------------------------------------------

## 📦 Livrables

### Phase 1

-   Projet fonctionnel
-   Code structuré
-   README explicatif

### Phase 2

-   Version TypeScript compilée
-   Comparatif JS / TS

