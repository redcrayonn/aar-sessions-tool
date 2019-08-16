FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies (both api && vue)
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build vue app for production with minification && start api
RUN npm run build 

EXPOSE 8080 3000
CMD [ "http-server", "dist" ]
CMD [ "node", "/app/api.app/js" ]

# docker run -it -p 8080:8080 -p 3000:3000 --rm odm/sessions:1.0
# docker build -t odm/sessions:1.0 .