# Vincent V. website - readme

This website is based on [Start Bootstrap - Freelancer v3.3.7+1](http://startbootstrap.com/template-overviews/freelancer).

# How to build this site

This procedure was tested on Lubuntu 16.04 LTS Xenial Xerus on March 2017.

The *Start Bootstrap* template is built with Gulp and uses some optional scripts written in TypeScript. If you want only to change the content, you can edit *index.html* and use pre-built files in the *dist* folder.

However, if you want to change the template style or add some scripting, you need to install these tools to build the site.

1. Install nodejs

    [Node.js®](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine. 

    It is necessary for the package manager named npm. This later and the following required tools are written entirely in JavaScript and depends very heavily on Node.js APIs. 

    Go to NodeJs website and follow the [instructions](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions).

    For convenience, the commands are presented below.
    ```
    sudo apt-get install curl
    curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo apt-get install -y build-essential
    ```

2. Install dev tools

    [Gulp](http://gulpjs.com/) is an automating toolkit. You may use Python or Webpack, *-insert your favorite batch tool here-* but since the *Start Bootstrap* template is built with gulp, you have to use it.

    - start a command line interface
    
    ```
    cd  <website_local_directory>
    ```

    2.a Fast & safe, but potentially wasting some HDD space  : All tools in the local directory
    
    ```
    npm install 
    ```

    2.b Saving some space but potentially breaking your global package versions.

    Manually install gulp and all its dependencies listed in package.json

    ```
    sudo npm install -g gulp
    sudo npm link gulp

    ...

    sudo npm install -g gulp-plugin-name
    sudo npm link gulp-plugin-name
    ```

    A node_modules/gulp folder should appear.

4. Install TypeScript

    [TypeScript](https://www.typescriptlang.org/) is a typed superset of JavaScript that compiles to JavaScript. Enjoy typing & ES 2017 latest features on every browser and on Node.js! 

    ```
    sudo npm install -g typescript
    ```

5. Build the site

    All the tools have been installed now. You have to build the site.
    The bootstrap template relies on [less](http://lesscss.org/) for styling and some js code.

    - start a command line interface
    - the tsc command transpile TypeScript: *.map and *.js files should 
    appear in the js folder
    - the gulp command concat & minify the stylesheet and script files :
    - a folder named *dist* should appear 
    - with two files: js/scripts.min.js & css/freelancer.min.css

    ```
    cd  <website_local_directory>
    tsc
    gulp 
    ```

    The following messages should appear in the console.
    ```
    ...
    [10:16:56] Starting 'default'...
    [10:16:56] Finished 'default' after 36 μs
    ```

    - for easier development, you can pop out a browser window in which content will be sync each time you do and save a modification in any styling (less) or content (html) files.

    ```
    gulp dev
    ```

# Bugs

The typescript process is not integrated with gulp.

- Since the typescript file map cannot be matched with gulp minified version, you have to use the non minified version for debugging.
- Gulp breaks at each typescript compilation error.







