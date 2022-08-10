FROM node:16 AS ui-build
WORKDIR /app
COPY front/ ./front/
RUN cd front && npm install --force && npm run build

FROM node:16 AS server-build
WORKDIR /back
COPY --from=ui-build /app/front/dist ./front/dist
COPY back/package*.json ./
RUN npm install
COPY back/ ./

EXPOSE 3000

CMD ["npm", "start"]
