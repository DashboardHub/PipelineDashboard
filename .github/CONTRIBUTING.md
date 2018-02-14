# Contributing to DashboardHub

Thank you for taking the time to contribute.

The DashboardHub community is a safe place for people to collaborate.

Please read the [CODE of CONDUCT](/CODE_OF_CONDUCT.md).

---

## All contributions are welcome 

...from typos in documentation to coding new features. If you require any help or have any questions please do not hesitate to ask, we are friendly and aim to reply within 48hours.

---

## Commit messages

We are now using [Conventional Commits specification](https://conventionalcommits.org)

### Commit Message Convention, at a Glance

Dont forget to include the **Issue Number**... 

_patches:_

```sh
git commit -a -m "fix(parsing): #123 fixed a bug in our parser"
```

_features:_

```sh
git commit -a -m "feat(parser): #123 we now have a parser \o/"
```

_breaking changes:_

```sh
git commit -a -m "feat(new-parser): #123 introduces a new parsing library
BREAKING CHANGE: new library does not support foo-construct"
```

_other changes:_

You decide, e.g., docs, chore, etc.

```sh
git commit -a -m "docs: #123 fixed up the docs a bit"
```

_but wait, there's more!_

Github usernames (`@bcoe`) and issue references (#133) will be swapped out for the
appropriate URLs in your CHANGELOG.
