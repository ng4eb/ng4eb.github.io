## Creating an Angular Project

To create an Angular project, open a terminal in any directory where you want to store the project code. For example, you can create a folder named `ng4eb` on the Desktop and open a terminal inside it.

Next, create a dummy application named `my-first-angular-application` for learning purposes by running the below command in the terminal.

```
ng new my-first-angular-application
```

The Angular CLI will prompt two questions:

1.  Would you like to add Angular routing? (y/N)
2.  Which stylesheet format would you like to use? (Use arrow keys)
  -   CSS
  -   SCSS
  -   Sass
  -   Less

Answer "no" to the first question by typing "N" and pressing enter. For the second question, select the default option, which is CSS.

![ng new command answering questions](/assets/images/ch2/ng_new.jpg)

The Angular CLI will generate a new project named `my-first-angular-application` in the current directory and automatically install the dependencies. If you want to skip the dependency installation, use the `--skip-install` flag after the `ng new` command. You can always install the dependencies later by running npm install in the project.

![automatic dependencies installtion](/assets/images/ch2/ng_new_installation.jpg)

## Useful Commands

### Self-help Command

To get help on how to use the Angular CLI, run `ng help` in the terminal. This command will return a list of available commands that you can run with `ng`. To see how to use a specific command, use the `--help` flag. For example, to see the arguments and available flags for the `ng add` command, run `ng add --help` in the terminal.

### Component Generation Command

We will generate a component named `first-component` for the `my-first-angular-application` project. Let's type in the below command inside a terminal in the project folder and hit enter:

```
ng generate component first-component
```

![ng generate component](/assets/images/ch2/ng_generate_component.jpg)

You can also use the abbreviation `ng g c first-component` to generate the same component. This command generates four files for the component:

![ng g c](/assets/images/ch2/ng_g_c.jpg)

The first argument of the command, `component`, is a **schematic** in Angular. **Schematics** are generators in Angular, which we could use to generate code, refactor and move existing files. If we head over to the schematics folder in the [Github repository of Angular](https://github.com/angular/angular-cli/tree/master/packages/schematics/angular), there is a collection of built-in schematics and their descriptions.

We can also get the list of available schematics by the command `ng generate --help`:

![list of available schematics](/assets/images/ch2/ng_schematics_list.jpg)

The second argument is the **name/path** of the component to be created. In the above example, `first-component` is the name we give to the new component.

By default, `ng generate component`  will create four files:
- `<component-name>.component.html` - the template of the component
- `<component-name>.component.css` - a stylesheet of the component
- `<component-name>.component.ts` - the component logic
- `<component-name>.component.spec.ts` - a testing file of the component

By default, ng generate component will also import the component inside the app module.

### Starting the Project

To start the application for development, use the command `ng serve`. This command sets the port to `4200` for development by default. You can change the port by using the `--port` flag. For example, to run the application on port `3000` during development, use `ng serve --port=3000`.

After running the command, you should see a successful message "Compiled Successfully". You can access the project website by going to http://localhost:4200.
