FROM --platform=$TARGETPLATFORM openjdk:17.0.1-jdk-slim
EXPOSE 8080
ADD target/docker-recommendation.jar docker-recommendation.jar
ENTRYPOINT ["java","-jar","docker-recommendation.jar"]