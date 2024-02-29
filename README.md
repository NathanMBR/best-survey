# best-survey

Open-source Surveys SaaS

## Issues with .eslintignore and VSCode

By default, VSCode plugin for ESlint doesn't resolves the `.eslintignore` recursively, which is a problem for monorepos like this.

To resolve this issue, insert this rule into your VSCode JSON configuration file:

```json
"eslint.workingDirectories": [
  {
    "pattern": "*"
  }
]
```

## License

[MIT](./LICENSE)
