# Strapi blog example

## Import script

```yml
#yamlPreprocessor=on
project:
  name: strapi-blog-prod
  tags:
    - strapi
    - prod
services:
  - hostname: db
    type: postgresql@12
    mode: HA
    priority: 2
  - hostname: storage
    type: object-storage
    objectStorageSize: 2
    priority: 1
  - hostname: api
    type: nodejs@16
    buildFromGit: https://github.com/zeropsio/recipe-strapi-blog@main
    enableSubdomainAccess: true
    envVariables:
      DATABASE_HOST: "${db_hostname}"
      DATABASE_PORT: "${db_port}"
      DATABASE_NAME: "${db_hostname}"
      DATABASE_USERNAME: "${db_user}"
      DATABASE_PASSWORD: "${db_password}"
      NODE_ENV: "production"
      STORAGE_HOSTNAME: storage
      STORAGE_BUCKET_NAME: strapidata
      S3_BUCKET_NAME: ${storage_serviceId|lower}.${STORAGE_BUCKET_NAME}
      S3_ACCESS_KEY_ID: "${storage_accessKeyId}"
      S3_ACCESS_SECRET: "${storage_secretAccessKey}"
      S3_ENDPOINT_URL: "${storage_apiUrl}"
      ADMIN_JWT_SECRET: <@generateRandomString(<22>)>
      JWT_SECRET: <@generateRandomString(<22>)>
      API_TOKEN_SALT: <@generateRandomString(<22>)>
      APP_KEYS: <@generateRandomString(<22>)>,<@generateRandomString(<22>)>,<@generateRandomString(<22>)>,<@generateRandomString(<22>)>
    ports:
      - port: 1337
        httpSupport: true
    verticalAutoscaling:
      minVCpu: 1
      maxVCpu: 5
      minRam: 1
      maxRam: 1
    minContainers: 3
```
