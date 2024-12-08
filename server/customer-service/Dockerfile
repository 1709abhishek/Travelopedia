FROM --platform=$TARGETPLATFORM openjdk:17.0.1-jdk-slim
EXPOSE 8080
ADD target/docker-customer.jar docker-customer.jar
ENTRYPOINT ["java","-jar","docker-customer.jar"]