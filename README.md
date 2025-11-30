# Hub Advent of code Angular

Une petite application Angular et une collection de schémas (schematics) pour organiser et générer rapidement des pages pour les solutions des puzzles Advent of Code.

- Live editor : https://stackblitz.com/~/github.com/leolade/advent-of-code-angular

## Aperçu

Le dépôt contient :

- une petite application Angular (dans `src/`) montrant des solutions pour différents jours.
- un package `generate-day/` qui contient un Angular Schematic permettant de générer le squelette d'un nouveau jour (fichiers TypeScript, entrées, etc.).

Objectif : faciliter la création et l'organisation des fichiers pour chaque puzzle de l'Advent of Code, et partager le schéma comme un package réutilisable.

## Prérequis

- Node.js (LTS recommandé)
- npm
- Angular CLI (ng)

## Arborescence principale

- `src/` : code de l'application Angular (composants, services, puzzles).
- `generate-day/` : package schematic (contient `package.json`, `src/collection.json`, scripts de build, etc.).

## Lancer l'application (développement)

1. Installer les dépendances :

```bash
yarn install
```

## Utiliser le schéma `generate-day`

Le schéma fourni dans `generate-day` permet de créer le squelette d'un nouveau jour. Le paquet est prévu pour être publié sur npm en tant que `@leolade/generate-day-aoc`.

Utilisation si le paquet est installé depuis npm :

```bash
ng g @leolade/generate-day-aoc:generate-day --day 1 --year 2025
```

## Après génération d'un jour : où coder la solution

Lorsque tu exécutes `ng g @leolade/generate-day-aoc:generate-day`, le schéma crée un service TypeScript pour le jour et la partie correspondante (ex. `src/app/2024/2/part2-day2-2024.ts`). Ce service étend la classe abstraite `Solution` fournie par le projet. Quelques points importants à connaître et étapes à suivre :

- Fichier à éditer : ouvre le service généré (ex. `src/app/2025/1/day1-part1-2025.ts`) et implémente la logique de la méthode `process` (et éventuellement `transform`).

- API de la classe `Solution` :
  - `private rawInput: string` — la chaîne d'entrée brute est injectée automatiquement via le token `PUZZLE_INPUT`. Tu peux l'utiliser directement dans `transform` et `process` (elle est accessible dans la classe de base).
  - `inputUtils: InputUtils` — instance injectée d'utilitaires pour parser et manipuler l'input (split, conversion, etc.). Réutilise ces helpers pour éviter de réécrire du parsing.
  - `abstract problemName: string` — propriété à définir dans ton service pour décrire le problème (affichée dans l'UI).
  - `protected transform(rawInput: string): InputType` — méthode que tu peux surcharger pour transformer la chaîne brute en une structure plus pratique (tableaux, objets, numbers...). Par défaut, elle retourne la chaîne brute.
  - `protected abstract process(input: InputType): ResultType` — méthode abstraite que tu dois implémenter : elle contient la logique pour résoudre le puzzle et doit retourner le résultat (souvent une string).
  - `generateResult(): Observable<ResultType>` — méthode publique utilisée par le composant `PuzzlePart` : elle appelle `transform` puis `process` et retourne un `Observable` contenant le résultat. Le composant s'abonne et affiche le résultat et la durée d'exécution.

- Bonnes pratiques :
  - Surcharger `transform` si ton puzzle manipule des structures (listes de tuples, grilles, graphes) pour garder `process` focalisé sur la logique métier.
  - Gérer explicitement les cas d'entrée invalide (input vide, format inattendu) et retourner des messages clairs ou lever des erreurs contrôlées.
  - Écrire des fonctions pures auxiliaires (hors classe) pour faciliter les tests unitaires de la logique de `process`.
  - Utiliser `this.inputUtils` pour opérations courantes (split, parseInt, etc.) afin d'assurer cohérence entre puzzles.

- Exemple rapide (dans le service généré) :

```ts
override problemName = 'Titre du problème';

protected override transform(rawInput: string) {
  return rawInput.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
}

protected override process(input: string[]) {
  // logique du puzzle sur un tableau de lignes
  return String(input.length);
}
```

## Licence

MIT
