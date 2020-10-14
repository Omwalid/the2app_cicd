FROM node as build_step
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build
#EXPOSE 3000 
#CMD [ "npm", "start" ]

FROM nginx 
COPY --from=build_step /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf