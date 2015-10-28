# Informations

### Staging Server
* URL: [demo.stectech.com/gps][GPS Staging Server]
* Server: ssh demostectech@199.101.48.109
* Password: 971DpCcny

# How work with branches

To work in this repository we use the **Git branching model** and you can see how viewing this picture bolow (you can see more details on how this technique works in this article: [A successful Git branching model][A successful Git branching model]
![Image of Yaktocat](http://nvie.com/img/git-model@2x.png)

### Branches
* Master: Deploy directly to the production server
* Develop: Deploy directly to the staging server
* Feature: Our main branch to create new features
* Hotfix: Rapid branch we create when we need from master branch

### Naming branches
* Feature: feacture/your-feature-name
* Hotfix: hotfix/your-hotfix-name

# Installation/Development

First You need NodeJS installed: Go to NodeJS website and download: [NodeJS website][NodeJS website].

Then run this codes:

```sh
$ git clone [git-repo-url] GPS
$ cd GPS
$ npm install
$ npm install bower
$ bower install
```

To run a local server, you just need to run:

```sh
$ gulp
```

And a local server will run in [localhost:3000](http://localhost:3000) 

# Deployment
The deployment is made by [Deploybot][Deploybot] denominates it as: A simple app for deploying your code anywhere without complex cookbooks, recipes, or configs.

To deploy to the [Staging Server][GPS Staging Server] you just need to marge a PR to the 'production' branch. For example:

You create a new feature branch `feature/mobile-navigation`, so when you merge this new branch with the `production` branch in some seconds this changes will be at the [Staging Server][GPS Staging Server] 

   [GPS Staging Server]: <http://demo.stectech.com/gps>
   [A successful Git branching model]: <http://goo.gl/Z36uCo>
   [Deploybot]: <https://www..deploybot.com>
   [NodeJS website]: <https://nodejs.org>
   


