# @leolade/generate-day-aoc

Angular schematics pour générer rapidement le squelette d'un "jour" (day) pour des projets Advent of Code.

## Description

Ce package fournit un schéma Angular (`schematic`) permettant de créer les fichiers et dossiers nécessaires pour ajouter un nouveau jour (ex. Day 1, Day 2...) dans un projet Angular organisé pour Advent of Code.

## Prérequis

- Node.js (version active LTS recommandée)
- npm
- Angular CLI (ng)

## Installation

- Pour utiliser la version publiée depuis le registre npm :

  npm install --save-dev @leolade/generate-day-aoc

- Pour développer localement depuis le dossier `generate-day` :

  1. Dans `generate-day`, compiler le projet :
     npm run build
  2. Lier localement le paquet :
     npm link
  3. Dans le projet Angular où vous voulez utiliser le schéma, faire :
     npm link @leolade/generate-day-aoc


## Utilisation

Pour générer un jour, exécutez la commande Angular schematics :

ng g @leolade/generate-day-aoc:generate-day

Selon la configuration du schéma, vous pouvez ajouter des options (par exemple `--day` ou `--year`) si elles sont exposées par le schéma.

Exemples :

- Générer un jour (commande de base) :
  ng g @leolade/generate-day-aoc:generate-day

- Générer un jour avec options (exemple hypothétique) :
  ng g @leolade/generate-day-aoc:generate-day --day 1 --year 2024


## Publication sur npm

Pour publier une nouvelle version sur npm depuis le dossier `generate-day` :

1. Mettre à jour la version dans `package.json` (ex. `0.1.2`).
2. Compiler :
   npm run build
3. S'assurer que `dist/` contient `collection.json` et les fichiers nécessaires.
4. Publier :
   npm publish --access public

Remarque : le champ `publishConfig.access` est déjà défini sur `public` dans `package.json`.

## Dépannage

- Erreur : "The nearest package directory ... doesn't seem to be part of the project declared in"
  - Cela survient si vous appelez `ng g` en pointant vers un package non installé dans `node_modules` ou si vous exécutez la commande depuis un sous-dossier. Solutions :
    - Installez le paquet dans votre projet (`npm install --save-dev @leolade/generate-day-aoc`) puis lancez la commande depuis la racine du projet Angular.
    - Pour tester localement sans publier : compilez (`npm run build`) puis utilisez `npm link` comme indiqué ci-dessus.

## Licence

MIT

