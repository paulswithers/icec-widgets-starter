---
title: Lab Setup
permalink: /docs/home/
redirect_from: /docs/index.html
---

### What we will be doing
In this lab we will start by exploring a HelloWorld custom widget to understand how widgets are registered in ICEC.  We will then build four (4) custom widgets to access various external content we want to surface in IBM Connections Engagement Center. 

The lab instructions are very specific on the tools we will using:

  - IDE: Visual Studio Code
  - Browser: Chrome
  - Development Server Environment: Node.js, NPM, Express and ngrok 
  - Code version control: It is also a good practice is to use Git for version control. There are a number of options you can choose from and for this lab we will be using Github (Don't worry about having an account on Github unless you want to save the code that you create).

However, these are not requirements for building widgets for ICEC! You can use a text editor to write your code. You can use just a plain text editor like a notepad. Popular and free solutions are Notepad++, Atom, TextMate and Visual Studio Code.

Note 1: For the Think 2018 conference, we are providing a virtual machine which contains these tools installed at a specific version. Please do not try to upgrade the versions (even if prompted by the various tools) or ask the lab facilitators before attempting any updates. 

Note 2: If you are trying to perform this lab outside of the Think 2018 conference, we will be providing step-by-step instructions shortly after the conclusion of the conference on installing these same tools on your own system. You are also free to follow this lab using the development tools you are most comfortable with.  

### Prerequisites
We’ll assume some familiarity with HTML, CSS and JavaScript, but you should be able to follow along even if you haven’t used them before. However, you may not know why we did certain things the way we did.

### Launch Visual Studio Code (or your favorite IDE)
For this walkthrough we are using Visual Studio Code, a free to download / use IDE available for Mac, Windows and Linux. Click on the icon in the launch bar to open it.  
![Visual Studio Code](../images/vsc.png)

### Integrated Terminal

VS Code has an **integrated terminal** which you can use to run shell commands. You can run Node.js directly from there and avoid switching out of VS Code while running command line tools.

![integrated terminal](../images/vsterm.png)

**View** > **Integrated Terminal** will open the integrated terminal and you can run commands throughout the lab, i.e. `npm install`, `npm run build`, etc... from there:

For this lab, we will open up two terminal sessions, using the + on the right hand side:
 - one for the server where our widgets will be served from during our development
 - one to generate and build package our custom widget code after every iteration.


