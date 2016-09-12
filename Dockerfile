FROM node:4.5.0
MAINTAINER Jared De La Cruz "jared@jareddlc.com”

WORKDIR /src

# Install app dependencies
RUN cd /src
ADD package.json /src/
ADD bower.json /src/
RUN npm install --no-spin

ADD gulpfile.js /src/
ADD index.js /src/

ADD lib/ /src/lib/
ADD site/ /src/site/

# Build app
RUN npm run bower
RUN npm run gulp-bower

EXPOSE 8080
EXPOSE 8443

ENV NODE_ENV production
CMD ["node", "/src/index.js"]
