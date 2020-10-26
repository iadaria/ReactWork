>npx sequelize-cli init
>npx dequelize-cli db:drop
>pg_ctl -D "C:\Program Files\PostgreSQL\13\data" stop -m immediate

Потребовалось разрешение
>pg_ctl -D "C:\Program Files\PostgreSQL\13\data" start

>npx sequelize-cli db:create
>npx sequelize-cli model:generate --name User --attributes username:string,email:string,password_digest:string
>npx sequelize-cli model:generate --name Category --attributes title:string
>nxp sequelize-cli db:migrate
>npx sequelize-cli seed:generate --name categoreis
>npx sequelize-cli db:seed:all

>psql movies_api_development

>psql -U postgres movie_api_development
>npx sequelize-cli model:generate --name Movie --attributes title:string,description:string,imageUrl,categoryId:integer
>npx sequelize-cli model:generate --name Vote --attributes userId:integer,movieId:integer

# After changed models and migrations files
> npx sequelize-cli db:migrate
>npx sequelize-cli seed:generate --name movies
Insert date to seed file
>npx sequelize-cli db:seed --seed 20201021182411-movies.js

# HEROKU Deploy
>heroku login
>heroku create graphql-movies_v2
>heroku create graphql-movies_v2-api
https://git.heroku.com/graphql-movies-v2.git
https://git.heroku.com/graphql-movies-v2-api.git

>heroku buildpacks:set heroku/nodejs --app=graphql-movies-v2-api

>heroku addons:create heroku-postgresql:hobby-dev --app=graphql-movies-v2-api
Created postgresql-convex-10454 as DATABASE_URL

>git init
>git remote add heroku https://git.heroku.com/graphql-movies-v2-api.git
>git remote -v
>git add -A .
>git commit -m "init server "
>git push heroku master


>heroku run npx sequelize-cli db:migrate