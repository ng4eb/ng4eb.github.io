export const ch2P1Markdown = `
## Prerequisites

Before you can install Angular, you need to have both **Node.js** and **npm** installed on your machine.

You can find the instructions for downloading and installing both of them on the [official Node.js website.](https://nodejs.org/)

_Note: The LTS version of Node.js is recommended_

To check if they have been installed successfully, you can run the following two commands inside a terminal:

\`\`\`
node -v
\`\`\`

\`\`\`
npm -v
\`\`\`

The first command returns the version of Node.js you installed, and the second returns the version of npm. You would see an error if either is not installed properly.

## Installation walkthrough

With Node.js and npm installed on your machine, you can run the below command to install Angular:

\`\`\`
npm install -g @angular/cli@latest
\`\`\`

*Note that you can run the same command for upgrading the Angular CLI if there is a newer version.*

### Verifying the Installation

To verify the installation, run \`ng --version\` inside a terminal. It should return some information of the Angular CLI installation including the current version.
`