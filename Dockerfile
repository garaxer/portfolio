FROM node:12-alpine
WORKDIR /app/

COPY package.json package-lock.json ./
RUN npm install 
COPY . .

CMD	 npm start


##Build
# docker build -t garybagn/portfolio .

##Run without compose
# docker run -it -dp 3000:3000 `
# -v "$(pwd):/app/" `
# -e CHOKIDAR_USEPOLLING=true `
# garybagn/portfolio