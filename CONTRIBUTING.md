# Contributing

## `pre-commit`

This repository uses [`pre-commit`](https://pre-commit.com/) to run some basic checks on every commit to automatically fix styling issues, ensure lint rules are passing, typecheck code, etc. These help ensure that what gets pushed up to the main repository is consistent and the only things that need review/testing are the architecture and semantics of the code in question.

`pre-commit` is a language-agnostic tool for hooking into `git` and running these checks. See https://pre-commit.com/ for how to install it on your system. (Note that since this is not a Python-based project, we do not have a `requirements.txt` file to add it to, and you will need to install pre-commit globally or elsewhere for use here).

Once `pre-commit` is installed, add the hooks to the git configuration with:

```
pre-commit install
pre-commit install --hook-type pre-push
```

**`pre-commit` is not required for contributing to this project,** but it will help simplify contributions and keep you on the right track while working to avoid a lot of trivial issues when it comes time to review.
