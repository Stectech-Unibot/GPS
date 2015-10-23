# How to setup to local

1. Install nodejs
2. clone repo `git clone git@github.com:Stectech/GPS.git` for ssh or `git clone https://github.com/Stectech/GPS.git` for https
3. npm install 
4. bower install
5. on the terminal run `gulp`

# Staging Server
ssh demostectech@199.101.48.109 password: 971DpCcny

# Deployment
How to Deploy sites from local to server using github

<b>IMPORTANT</b>
* Before EOD you need to update the server so that the QA can check your work and comment on it
* Do not commit large files or revisions, as much as possible commit per task so that other developers can see what are the changes made, this also allows us to revert changes much easier if there are some regressions on the code.

For existing project  
* execute git pull origin master on the root directory of your project

For New Project

Clone the repository that you want to work in
* git clone https://github.com/Stectech/<project name>.git for http
* git clone git@github.com:Stectech/<project name>.git for ssh


After cloning the branch
make sure to update the branch before making any change - git pull origin <branch name> 
Start working on the branch and add files and commit changes you have

Steps
* git add <filename>
* git commit -m “message of what you did”
* git push origin <branch name you are currently on>

Note: If you are working with a database changes, (e.g. wordpress settings or adding some content) you should change it on the demo site and your local, do not migrate your database settings and overwrite the demo server. This will prevent us to not remove or delete any changes 
made by the editor or QA

Steps
* ssh to demo server - ssh demostectech@199.101.48.109 (either in readme.md file or ask hannah or dave for credentials)
* once on the demo server 
 * if  the project doesn't have a folder yet create a subfolder under public_html. It should look like public_html/<project-name>
* clone the repo 



