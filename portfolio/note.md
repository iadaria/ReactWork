>npm run dev
>node server/fakeDb/populate.js

### Fetch portfolio by ID
1. Apply template from resources to portfolios/[id].js
2. Fetch portfolio by ID, similiary as we did with portfolios - id you can get from query in getInitialProps
3. Display portfolio data in detail page

#deploy
>npm run build
>npm start
>delete "start": "NODE_ENV=production node server/index.js",
>npm install --save cross-env
>install heroku.cli