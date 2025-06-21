# Build stage
FROM maven:3.8.6-amazoncorretto-17 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src /build/src
RUN mvn package -DskipTests

# Run stage
FROM openjdk:17-alpine
COPY --from=build /build/target/ApiGateway-0.0.1-SNAPSHOT.jar /opt/api-gateway/app.jar
ENTRYPOINT ["java", "-jar", "/opt/api-gateway/app.jar"]
