# - - - Build Stage - - -
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /build

# 1. Copy only pom.xml and settings to cache
COPY pom.xml .
COPY .mvn/ .mvn
COPY mvnw .

# 2. Downloading dependencies
RUN ./mvnw dependency:go-offline -B

# 3. Copy src
COPY src ./src

# 4. Collect jar file
RUN ./mvnw clean package -DskipTests

# ----------------------

# Run stage | Without maven
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# 5. Copy only jar file from pervious stage
COPY --from=build /build/target/DiscoveryEurekaServer-0.0.1-SNAPSHOT.jar app.jar

# 6. Open port 8761 | for Discovery Eureka Server: 8761
EXPOSE 8761

# 7. Run application
ENTRYPOINT ["java", "-jar", "app.jar"]