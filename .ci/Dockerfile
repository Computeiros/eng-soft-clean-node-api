FROM node:16-slim

RUN apt update
RUN apt-get install -y openssl wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /app

COPY package.json .
COPY *.lock .
COPY .ci/ci_bootstrap.sh .
COPY . .

RUN chmod +x .ci/ci_bootstrap.sh

# ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sbdd?schema=public
      
ENTRYPOINT ["dockerize", "-wait", "tcp://db:5432", "-timeout", "20s", ".ci/ci_bootstrap.sh"]
