lazy val akkaHttpVersion = "10.0.11"
lazy val akkaVersion = "2.5.11"

lazy val root = (project in file(".")).
  settings(
    inThisBuild(List(
      organization := "io.avro.schema.validator",
      scalaVersion := "2.12.4"
    )),
    name := "Avro Schema Validator",
    assemblyJarName in assembly := "avro-schema-validator.jar",
    libraryDependencies ++= Seq(
      "com.typesafe.akka" %% "akka-http" % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-spray-json" % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-xml" % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-stream" % akkaVersion,
      "com.typesafe" % "config" % "1.3.1",
      "tech.allegro.schema.json2avro" % "converter" % "0.2.5",

      "com.softwaremill.macwire" %% "macros" % "2.3.0" % "provided",
      "com.softwaremill.macwire" %% "macrosakka" % "2.3.0" % "provided",
      "com.softwaremill.macwire" %% "util" % "2.3.0",
      "com.softwaremill.macwire" %% "proxy" % "2.3.0",

      "com.typesafe.akka" %% "akka-http-testkit" % akkaHttpVersion % Test,
      "com.typesafe.akka" %% "akka-testkit" % akkaVersion % Test,
      "com.typesafe.akka" %% "akka-stream-testkit" % akkaVersion % Test,
      "org.scalatest" %% "scalatest" % "3.0.1" % Test
    )
  )
