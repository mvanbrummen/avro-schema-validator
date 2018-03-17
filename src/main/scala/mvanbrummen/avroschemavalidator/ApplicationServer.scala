package mvanbrummen.avroschemavalidator

import akka.actor.{ActorRef, ActorSystem}
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.stream.ActorMaterializer
import com.typesafe.config.ConfigFactory
import mvanbrummen.avroschemavalidator.actors.AvroSchemaValidatorActor
import mvanbrummen.avroschemavalidator.routes.{AvroSchemaValidationRoutes, StaticRoutes}

import scala.concurrent.Await
import scala.concurrent.duration.Duration

object ApplicationServer extends App with AvroSchemaValidationRoutes with StaticRoutes {

  implicit val system: ActorSystem = ActorSystem("avroSchemaValidatorAkkaHttpServer")
  implicit val materializer: ActorMaterializer = ActorMaterializer()

  val config = ConfigFactory.load()

  val avroSchemaValidationActor: ActorRef = system.actorOf(AvroSchemaValidatorActor.props, "avroSchemaValidatorActor")

  lazy val routes: Route = concat(staticResourcesRoutes, avroSchemaValidationRoutes)

  Http().bindAndHandle(routes, config.getString("http.interface"), config.getInt("http.port"))

  println(s"Server online at http://localhost:8080/")

  Await.result(system.whenTerminated, Duration.Inf)
}