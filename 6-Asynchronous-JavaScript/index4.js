// Asynchronous
console.log("Before");
getUser(1, (user) => {
  getRepositories(user.githubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
      // Callback Hell
    });
  });
});
console.log("After");

// Synchronous
console.log("Before");
const user = getUser(1);
const repos = getRepositories(user.githubUsername);
const commits = getCommits(repos[0]);
console.log(commits);
console.log("After");

console.log("After");
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
