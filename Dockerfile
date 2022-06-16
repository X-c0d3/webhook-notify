FROM node:17.3.0-alpine
ENV NODE_ENV production

WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json ./
RUN yarn install --silent
RUN yarn global add typescript
COPY . /usr/src/app
RUN yarn build

# COPY [".env", "/usr/src/app"]
# COPY ["server.js", "/usr/src/app"]
# COPY . .

# Enable SSL cert
RUN apk add openssl busybox-extras curl

RUN rm -rf /usr/src/app/ssl-cert && mkdir /usr/src/app/ssl-cert
RUN cd /usr/src/app/ssl-cert && openssl genrsa -out key.pem
RUN cd /usr/src/app/ssl-cert && openssl req -new -key key.pem -out csr.pem -subj "/C=TH/ST=Bangkok/L=Bangkok/O=Global Security/OU=IT Department/CN=rockdevper.com"
RUN cd /usr/src/app/ssl-cert && openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem


EXPOSE 3005
EXPOSE 443
CMD [ "node", "build/src/server.js" ]