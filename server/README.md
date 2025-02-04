## Create a new migration

```shell
npx sequelize-cli migration:create --name post-create-table
npx sequelize-cli migration:create --name add-column
```

## Create a new seeder

```shell
npx sequelize-cli seed:create --name post-demo
```

## Migration and seeding

```shell
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Start server

```shell
npm run dev
```