FROM openjdk:8

RUN mkdir -p /app

WORKDIR /app

COPY ./ /app/

RUN apt-get update && \
        apt-get install python-software-properties -y && \
        apt-get install curl && \
        curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
        apt-get install nodejs -y && \
        wget https://bootstrap.pypa.io/get-pip.py && \
        python get-pip.py --user && \
        export PATH=/root/.local/bin:$PATH && \
        pip install awscli --upgrade --user && \
        npm install serverless -g && \
        npm install node-inspector -g && \
        npm install && \
        serverless dynamodb install
        
EXPOSE 8000 3000 5858

ENTRYPOINT ["sls", "offline", "start", "--seed=vehicle"]
