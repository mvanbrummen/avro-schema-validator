FROM anapsix/alpine-java 
COPY target/scala-2.12/avro-schema-validator.jar /home/avro-schema-validator.jar
CMD ["java","-jar","/home/avro-schema-validator.jar"]
