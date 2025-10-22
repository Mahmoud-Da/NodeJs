console.log("Before");
getUser(1, getRepositoriesForUser);
console.log("After");

function getRepositoriesForUser(user) {
  getRepositories(user.githubUsername, getCommitsForUser);
}

function getCommitsForUser(repos) {
  getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    callback({ id: id, githubUsername: "mosh" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("Reading Commits from Repo...");
    callback(["commit1", "commit2", "commit3"]);
  }, 2000);
}
