FROM --platform=$TARGETPLATFORM openjdk:17.0.1-jdk-slim
EXPOSE 8080
ADD target/budget-service.jar budget-service.jar
ENTRYPOINT ["java","-jar","budget-service.jar"]