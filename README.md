# The project
This project is a test given to me by Finiata, and has the objective to show my current expertise with ReactJS and Redux for the front-end development, and a NodeJS back-end, to which I chose AdonisJS.

Although simple, this project has given me moments of struggle. Before, I have used a Github project that had been created to be a skeleton of ReactJS and Redux already configured and communicating. I learned this project is deprecated and no longer maintained and I decided to use the Facebook's `create-react-app` since it was referenced by this project, to initialize my test solution. Since `create-react-app` is purely React only, configuring Redux was a challenge. Videos and articles read, and after a basic configuration has been reached, I used my knowledge and past references to improve it, allowing me to reach the closest configuration giving the same ease the not deprecated project gave, but better in some ways. Not only this, but I have also taken the chance to learn TDD and apply on this test. 

I hope that this has shown my interest to Finiata and on the opportunity given by them, as well as my desire to learn and improve more, because this has also provided me new experiences!

## Requirements
Before proceeding, make sure your computer has `git`, `node`, and a database such as MySQL, or any other of your preference.

To test, simply open a terminal emulator and type the commands. In case you see `[command]: command not found`, it means your computer doesn't have it.

To install `git`, please refer to this [installation guide](https://gist.github.com/derhuerst/1b15ff4652a867391f03 "installation guide"), and to install `node`, it is highly recommended that you download `nvm` script to install and manage your node versions. The instructions can be found [here](https://github.com/creationix/nvm#installation "here").

The database is up to you, but during the process of development of this application, MySQL was used.

## Setting up
There are few steps that need to be taken before executing and testing this application in your machine. First, this project needs to be cloned. You are going to need `git` to be able to execute this first command.

Open your terminal emulator of preference and `cd` into the folder you wish to have the project stored.

> `cd path/to/folders`

Then, run the following command to have this project in the selected folder:

> `git clone https://github.com/mfgabriel92/finiata-frontend-applicant-test`

You may also access the [link](https://github.com/mfgabriel92/finiata-frontend-applicant-test "link") and click on green button at the right saying "Clone or download" and then "Download ZIP".

After the process is done, you will see a folder with the name of the repository, and inside the folder, the following structure:

    |__api/ `it contains the back-end code powered by AdonisJS`
    |__webroot/ `it contains the front-end code using ReactJS and Redux`
    |__README.md `This whole text`

The next step requires `node` to be installed and you need to be in `api` and `webroot` folders. You may open two tabs or two terminal windows and run the command at the same time on both folders, or do it in one at a time. `cd` to enter them and run

> `npm install`

then wait until all the requirements are installed. It might take a while depending on your connection speed. By the end, each folder will have a `node_modules` folder, which holds all the requirements and third party modules.

The next following steps will require you to be in `api` folder only. First, you need to prepare the database. Duplicate the `.env.example` file and rename it to `.env`. You may copy and paste, and manually rename it, or run the following command:

> `cp .env.example .env`

It is already pre configured for a MySQL database named "finiata", having both username and password set as "root":

    HOST=127.0.0.1
    PORT=3333
    NODE_ENV=development
    APP_URL=http://${HOST}:${PORT}
    CACHE_VIEWS=false
    APP_KEY=oND6yblxe4OcPzDnxjlcagDYagOt4CAZ
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=root
    DB_DATABASE=finiata
    SESSION_DRIVER=cookie

If you wish to modify it, the constant names are `DB_CONNECTION`, `DB_USER`, `DB_PASSWORD`, and `DB_DATABASE`. Alter them according to your configurations.

Next, you need to run the migrations command. It will automatically create all the tables the application needs. To do so, simply run

> `node ace migration:run`

and if the database was properly set up, it will begin the process of migration.

Finally, to run the project and be able to test it, still within `api` folder, run

> `npm run start`

Then, you must open another terminal window, because both commands need to be running. `cd` into `webroot` and run

> `npm start`

A browser window will automatically open once it's done preparing the environment. After that, you're free to test the application :fa-smile-o:.

