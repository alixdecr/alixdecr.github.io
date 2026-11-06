# Chapitre 2 - Langages Hors-Contexte

*Dernière mise à jour : 22/10/2026*

## Exercices

### Vrai ou Faux

Déterminez si les affirmations suivantes sont vraies ou fausses et justifiez.

###### Tout langage régulier est hors-contexte.

Vrai

###### Tout langage hors-contexte est régulier.

Faux

###### Tout langage fini est hors-contexte.

Vrai

###### Toute expression régulière est exprimable sous la forme d'une grammaire hors-contexte.

Vrai

###### On peut représenter un langage fini par une grammaire hors-contexte et un automate fini.

Vrai

###### Tout sous-langage d'un langage régulier est régulier.

Faux (piège)

Exemple : le langage de tous les mots possibles sur est bien régulier. Cependant, le langage des palindromes sur est bien un sous-ensemble du précédent, mais n'est pas régulier.

### Reconnaissance de Langages

Soit les langages suivants définis sur l'alphabet $\Sigma = \{a, b, c\}$ . Déterminez s'ils sont hors-contexte et justifiez.

###### Le langage des mots de la forme $a^nc^nc^n, n \ge 0$.

Peut être simplifié par $a^n c^{2n}$

- **Fini ?** Non, car on ne peut pas énumérer l'ensemble des mots du langage (infini).
- **Régulier ?** Non, car on ne peut pas représenter le langage par une expression régulière/automate fini. L'information $n$ ne peut pas être retenue ; Par exemple, si exposant $n < 5$, il aurait été possible de trouver une regex mais pas le cas ici.
- **Hors-contexte ?** Oui, il est possible de représenter le langage avec la grammaire hors-contexte suivante :

```
S -> aScc | ε
```

###### Le langage des mots de la forme $a^nba^n, n \ge 0$.

- **Fini ?** Non, car on ne peut pas énumérer l'ensemble des mots du langage (infini).
- **Régulier ?** Non, car on ne peut pas représenter le langage par une expression régulière/automate fini. On ne peut pas garantir que le nombre de $a$ à gauche sera le même qu'à droite.
- **Hors-contexte ?** Oui, il est possible de représenter le langage avec la grammaire hors-contexte suivante :

```
S -> aSa | b
```

On n'ajoute pas de mot vide ($\varepsilon$) car il y aura toujours au moins un $b$ dans un mot généré par le langage.

###### Le langage des mots de la forme $a^nb^m, n > m \ge 0$.

- **Fini ?** Non, car on ne peut pas énumérer l'ensemble des mots du langage (infini).
- **Régulier ?** Non, car on ne peut pas représenter le langage par une expression régulière/automate fini. On ne peut pas garantir les conditions imposées sur le nombre de $a$ et de $b$.
- **Hors-contexte ?** Oui, il est possible de représenter le langage avec la grammaire hors-contexte suivante :

```
S -> aSb | aS | a
```

Pas de mot vide ($\varepsilon$) car la condition impose que $n \ge 1$, donc il y aura toujours au moins un $a$.

###### Le langage des mots qui contiennent autant de $a$ que de $b$ et aucun $c$.

- **Fini ?** Non, car on ne peut pas énumérer l'ensemble des mots du langage (infini).
- **Régulier ?** Non, car on ne peut pas représenter le langage par une expression régulière/automate fini. On ne peut pas garantir qu'un mot généré ait autant de $a$ que de $b$.
- **Hors-contexte ?** Oui, il est possible de représenter le langage avec la grammaire hors-contexte suivante :

```
S -> aSbS | bSaS | ε
```

###### Le langage des palindromes (mots qui peuvent se lire de la même façon du sens inverse).

- **Fini ?** Non, car on ne peut pas énumérer l'ensemble des mots du langage (infini).
- **Régulier ?** Non, car on ne peut pas représenter le langage par une expression régulière/automate fini. On ne peut pas garantir qu'un mot généré ait la forme d'un palindrome.
- **Hors-contexte ?** Oui, il est possible de représenter le langage avec la grammaire hors-contexte suivante :

```
S -> aSa | bSb | cSc | a | b | c | ε
```

 Il ne faut pas oublier de prendre en compte les cas avec une lettre au milieu (e.g., $aca$) et cas avec 2 lettres au milieu (e.g., $bccb$) (= palindromes pairs et impairs).

###### Le langage des mots de la forme $c(a|b)^nc(a|b)^n c, n \ge 0$.

- **Fini ?** Non, car on ne peut pas énumérer l'ensemble des mots du langage (infini).
- **Régulier ?** Non, car on ne peut pas représenter le langage par une expression régulière/automate fini. On ne peut pas garantir le même nombre $n$ des combinaisons de $a$ et de $b$.
- **Hors-contexte ?** Oui, il est possible de représenter le langage avec la grammaire hors-contexte suivante :

```
S -> cXc
X -> YXY | c
Y -> a | b
```

###### Le langage des mots répétés $\{w.w \mid w \in \Sigma^*\}$.

- **Fini ?** Non, car on ne peut pas énumérer l'ensemble des mots du langage (infini).
- **Régulier ?** Non, car on ne peut pas représenter le langage par une expression régulière/automate fini. On ne peut pas garantir que le mot $w$ soit généré deux fois de la même façon.
- **Hors-contexte ?** Non, car on ne peut pas représenter le langage par une grammaire hors-contexte/automate à pile.

> Une grammaire hors-contexte peut gérer des dépendances équilibrées (e.g., $a^nb^n$), mais pas des dépendances plus complexes. Par exemple, recopier un même mot de longueur inconnue est impossible avec une grammaire hors-contexte/automate à pile car une mémoire proportionnelle au mot serait requise.

### Suppression d'Improductifs en Inaccessibles

Supprimez les improductifs et les inaccessibles des grammaires suivantes.

###### Grammaire 1

```
S -> a | A
A -> AB
B -> b
```

- $A$ est improductif.
- En supprimant $A$ (improductif), $B$ devient inaccessible.

La grammaire hors-contexte devient donc simplement :

```
S -> a
```

###### Grammaire 2

```
S -> T | U
U -> aYb | V
V -> W
X -> W | a
Y -> Z
Z -> c | ε
```

**IMPRODUCTIFS**

En appliquant l'algorithme, on peut en premier lieu marquer les NT étant productifs sur base des terminaux présents :

- On marque $X$ comme productif car il produit un terminal $a$.
- On marque $Z$ comme productif car il produit un terminal $c$.
- On marque $Y$ comme productif car il produit $Z$, qui est lui-même productif.
- On marque $U$ comme productif car il produit $aYb$, contenant $Y$ qui est lui-même productif et $a, b$ qui sont des terminaux.
- On marque le NT de départ $S$ comme productif car il produit $U$, qui est lui-même productif.

On trouve donc les NT productifs suivants : $\{S, U, X, Y, Z\}$. On va à présent supprimer les NT de la grammaire n'étant pas repris dans l'ensemble des productifs :

- On supprime $T$ dans $S$.
- On supprime $V$ dans $U$.
- On supprime $V \rightarrow W$ car il n'est pas productif.
- On supprime $W$ dans $X$.

**INACCESSIBLES**

En appliquant l'algorithme, on peut marquer les NT accessibles sur base des NT produits par des accessibles :

- $S$ est le symbole de départ, il est donc accessible.
- $U$ est compris dans le NT accessible $S$, il est donc accessible aussi.
- $Y$ est compris dans le NT accessible $U$, il est donc accessible aussi.
- $Z$ est compris dans le NT accessible $Y$, il est donc accessible aussi.

On obtient finalement la grammaire réduite suivante :

```
S -> U
U -> aYb
Y -> Z
Z -> c | ε
```

Ce qui est davantage simplifié en :

```
S -> aYb
Y -> c | ε
```

Et même encore :

```
S -> acb | ab
```

### Dérivation et Arbres

Soit la grammaire hors-contexte suivante :

```
S -> O, S | O
O -> debit X from A | credit X to A
X -> 100 | 200 | 300
A -> bob | alice | steve
```

###### Générez l'arbre syntaxique correspondant au mot `debit 200 from steve, credit 100 to alice`.

Cf. tableau

###### Cette grammaire est-elle ambiguë ?

Non, car il n'existe pas plusieurs dérivations possibles pour un même mot du langage.

###### Donnez un exemple d'une grammaire hors-contexte qui est ambiguë.

```
S -> S + S | S * S | a
```

Cette grammaire est ambiguë car il existe plusieurs dérivations possibles pour un même mot du langage. Par exemple, le mot `a + a * a` peut être dérivé de deux façons différentes :

- Multiplication en premier : `S --> S * S --> (S + S) * S --> (a + a) * a`
- Addition en premier : `S --> S + S --> S + (S * S) --> a + (a * a)`

## License

&copy; 2024-2026 Alix Decrop. Le contenu de cette page est mis à disposition selon les termes de la license [Creative Commons Attribution - CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).