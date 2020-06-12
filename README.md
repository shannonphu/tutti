# Tutti

## Setting up environment for the first time

* For Mac users:
  1. Install [Homebrew](https://brew.sh/) if you haven't already.
  2. `brew install node`
* For windows users:
  1. Go to <https://nodejs.org/en/download/> to install node.js

### Preferred IDE: [VS Code](https://code.visualstudio.com/)

## Development Workflow

1. `npm install`
2. `npm run install`
3. `npm start`
4. Go to <http://localhost:3000/>

## Git Workflow

1. `git checkout -b <your-name>/<feature-name>`
2. Code until you hit a good checkpoint. Make sure there are no errors/broken builds.
3. `git status` shows you what files you have changed.
4. Commit your files
    * If you want to commit all modified files:

      ```git
      git add -A
      ```

    * Otherwise to add the particular files you want to commit:

      ```git
      git add <file1> <file2> <...>
      ```

5. `git commit -m "some commit message"`
6. Push your branch
    * For brand new branches:

      ```git
      git push -u origin <branch name>
      ```

    * For previously pushed branches:

      ```git
      git push
      ```

    * you can find your branch names with `git branch`

## Pull Request Workflow

* Make a new branch formatted `<your-name>/<feature-name>` to submit a pull request to master.
* Notify team that a PR has been made :)
* After a pull request is approved, rebase and squash commits before merging into master

1. Checkout to master

    ```shell
    git checkout master
    ```

2. Pull the most recent changes from master

    ```shell
    git pull
    ```

3. Check into the branch of the PR

    ```shell
    git checkout <your branch name>
    ```

4. Rebase and squash commits:

    ```shell
    git rebase master
    ```

5. Push changes to GitHub.

    ```shell
    git push -f
    ```

    **Do _NOT_ force push to other people's branches or shared branches**
