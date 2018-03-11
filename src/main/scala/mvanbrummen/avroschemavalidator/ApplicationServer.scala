package mvanbrummen.avroschemavalidator

import akka.actor.{ ActorRef, ActorSystem }
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Route
import akka.stream.ActorMaterializer

import scala.concurrent.Await
import scala.concurrent.duration.Duration

object ApplicationServer extends App with AvroSchemaValidationRoutes {

  implicit val system: ActorSystem = ActorSystem("avroSchemaValidatorAkkaHttpServer")
  implicit val materializer: ActorMaterializer = ActorMaterializer()

  val avroSchemaValidationActor: ActorRef = system.actorOf(AvroSchemaValidatorActor.props, "avroSchemaValidatorActor")

  lazy val routes: Route = avroSchemaValidationRoutes

  Http().bindAndHandle(routes, "localhost", 8080)

  println(s"Server online at http://localhost:8080/")

  Await.result(system.whenTerminated, Duration.Inf)
}