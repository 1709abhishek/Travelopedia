FROM --platform=$TARGETPLATFORM openjdk:17.0.1-jdk-slim
EXPOSE 8080
ADD target/recommendation-service.jar recommendation-service.jar
ENTRYPOINT ["java","-jar","recommendation-service.jar"]