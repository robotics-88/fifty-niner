
## Installation:

### Running on-demand

Using `npx` you can run the script without installing it first:
```
npx fifty-niner [json file] [(optional) destination]
```

### Installing Globally

```
npm install --global fifty-niner
```

Now the `fifty-niner` command can be run anywhere!


## JSON File Format

Example JSON file:
```json
{
  "repositories": {
    "hello-world": {
      "url": "octocat/Hello-World",
      "branch": "master"
    },
    "fifty-niner": {
      "url": "robotics-88/fifty-niner"
    }
  },
  "defaults": {
    "branch": "main",
    "depth": 1
  }
}
```

The top level keys are `repositories` and `defaults`:

The `repositories` object is where you list each repository Fifty-Niner should pull from. It accepts the following properties:
  - `url` in the format `[github username/organizaton]/[repository name]` that lets Fifty-Niner where to pull from.
  - `branch`, if not pulling from the default branch
  - `depth` for shallow copies. Set `depth` to 1 if you only want the most recent commit.

The `defaults` object is where you can specify default `repository` properties without having to include them in each `repository` object, such as if you want `depth: 1` for every repo.

