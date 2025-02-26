FROM eclipse-temurin:23-jdk 
WORKDIR /app 
CMD ["./gradlew", "clean", "bootJar"]
COPY back/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
