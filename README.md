## Répartition du Gitlab
  

[**src**](src) : **Toute la partie code de l'application** (ne contient que le serveur TypeScript à l'heure actuelle sans l'implémentation du service de mail)
  
## Fonctionnement

- ### Comment lancer le projet ?

  

Tout d'abord si ce n'est pas fait cloner le dépôt de la branche **master**, pour cela copier le lien URL du dépôt git :**git clone https://codefirst.iut.uca.fr/git/david.d_almeida/auth-app-react.git**  

Ensuite dans un terminal, assurer vous que vous possédez node.js, pour cela il existe la commande : **npm -v**

:information_source: *Si vous ne disposez pas de node.js, allé sur le site [Download Node.js](https://nodejs.org/en/download/) pour pouvoir le télécharger, vous pouvez aussi utiliser nvm qui est un outil de gestion des versions de Node.js sur votre appareil, pour en savoir plus il existe le site [Guide NVM](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) !!!*

<br>

Pour la suite, il suffit  de modifier le fichier .env pour qu'il corresponde à votre environnement de travail postgre et d'utliser le fichier 
[**import.sql**](import/import.sql) pour permettre à l'application de fonctionner.

<br>

``` bash
REACTPORT=3000

REACTPORTDB=5432

REACTUSERNAME=postgres

REACTHOST=localhost

REACTDATABASE=reactAuth

REACTPASSWORD=achanger

```

Maintenant vous pouvez à tout moment lancer l'application après avoir installer les dépences via la commande : **npm install** puis grâce à la commande : **npm run start :sunglasses:**


## Environnement de Travail

  

L'environnement de travail se base sur plusieurs outils et langages :👇

  

<div align = center>

  

---

&nbsp; ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

&nbsp; ![TypeScript](https://img.shields.io/badge/TypeScript-000?style=for-the-badge&logo=typescript&logoColor=white&color=blue)

&nbsp; ![JavaScript](https://img.shields.io/badge/JavaScript-000?style=for-the-badge&logo=javascript&logoColor=white&color=yellow)


---

  

</div>

  


## Contact

<br>

- David D'ALMEIDA : david.dalmeida02@yahoo.com

  

<div align="center">


<img src="https://codefirst.iut.uca.fr/git/avatars/0f8eaaad1e26d3de644ca522eccaea7c?size=870" width="50" >

</a>

</div>
