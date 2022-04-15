export const ch2P2Markdown = `
## Project creation walkthrough

To begin, let's open up a terminal inside any folder where you would like to store the project code.

For example, you could create a folder named \`ng4eb\` in the \`Desktop\` directory. Then, open a terminal inside the \`ng4eb\` folder.

Inside the terminal, let's create a dummy application named \`my-dummy-application\` for learning purposes. Let's type the command \`ng new my-dummy-application\` and hit enter. We will need to answer the below two questions from the CLI:

1.  Would you like to add Angular routing? (y/N)
2.  Which stylesheet format would you like to use? (Use arrow keys)
    -   CSS
    -   SCSS
    -   Sass
    -   Less

For the first question, we may answer no by typing in \`N\` and hitting enter.

For the second question, we will choose CSS (the default option).

![ng new command answering questions](/assets/images/ch2/ng_new.jpg)

The Angular CLI would then generate a new project named \`my-dummy-application\` in the current directory. When Angular generates the project, it also automatically installs the dependencies for you:

![automatic dependencies installtion](/assets/images/ch2/ng_new_installation.jpg)

If you would like to skip the installation due to slow network or some other reasons, you can add the \`--skip-install\` flag behind the \`ng new\` command. We will still get the same \`package.json\` file. Afterwards, you can run \`npm install\` in the project anytime to install back the dependencies.


## Useful Commands

### Self-help Command

We can get help on how to use the Angular CLI by running \`ng help\` in the terminal.

This command will return a list of available commands that we can run with \`ng\` . For example, the command \`ng add\` would add an external library to an existing Angular project. To see how we can use a specify command, we can use the \`--help\` flag. For \`ng add\` , we can type in \`ng add --help\` in the terminal to see the arguments it requires and its available flags.

### Component Generation Command

We will generate a component named \`dummy\` for the \`my-dummy-application\` project. Let's type in the below command inside a terminal in the project folder and hit enter:

\`\`\`
ng generate component dummy
\`\`\`

![ng generate component](/assets/images/ch2/ng_generate_component.jpg)

In the command, \`generate\` has an abbreviation \`g\` and \`component\` has an abbreviation \`c\`. So, we can also run \`ng g c dummy\` to generate a component named \`dummy\`. Since we have generated the \`dummy\` component, we won't be able to create the component of the same name again:

![ng g c](/assets/images/ch2/ng_g_c.jpg)

In the command, \`generate\` is the main command, and both \`component\` and \`dummy\` are its arguments. The first argument \`component\` is a **schematic** in Angular. **Schematics** are generators in Angular, most of which we would use to generate code, and some can also refactor and move existing files. If we head over to the schematics folder in the [Github repository of Angular](https://github.com/angular/angular-cli/tree/master/packages/schematics/angular), we can find a collection of built-in schematics and their descriptions in the \`README.md\` file.

We can also get the list of available schematics by the command \`ng generate --help\`:

![list of available schematics](/assets/images/ch2/ng_schematics_list.jpg)

The second argument is the **name/path** of the component to be created. In the above example, \`dummy\` is the name we give to the new component.

By default, \`ng generate component\`  will create four files:
- \`<component-name>.component.html\` - the template of the component
- \`<component-name>.component.css\` - a stylesheet of the component
- \`<component-name>.component.ts\` - the component logic
- \`<component-name>.component.spec.ts\` - a testing file of the component

It also automatically imports the component inside the app module. We will learn all about these files later.

### Starting the Project

 To start the application for development, we use the command \`ng serve\`. After running the command, we should see a successful message "Compiled Successfully".

The message indicates that the Angular project has successfully started. We can access the project website by going to \`http://localhost:4200\`. By default, Angular sets the port to 4200 for development. You can change the port by using the flag \`--port\`. For example, if you want your application to run on port \`3000\` during development, you can use \`ng serve --port=3000\`.
`
