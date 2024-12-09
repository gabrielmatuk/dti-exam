# Turbo Monorepo

Install all dependencies:

```bash
pnpm install
```

Start the database
  
  ```bash
  docker compose up --build -d
  ```

Start as development mode:

```bash
pnpm dev
```

For lint only use the command:

```bash
pnpm lint
```

For test open the API folder and follow the instructions in the README.md

>[!IMPORTANT]
>For detailed info check each app README.md

## Improvements
- Add the backend build to the docker-compose
- Configure monorepo tests