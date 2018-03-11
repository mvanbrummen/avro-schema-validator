package mvanbrummen.avroschemavalidator

import akka.actor.{ ActorRef, ActorSystem }
import akka.event.Logging
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.server.directives.MethodDirectives.post
import akka.http.scaladsl.server.directives.PathDirectives.path
import akka.pattern.ask
import akka.util.Timeout
import mvanbrummen.avroschemavalidator.AvroSchemaValidatorActor.{ ValidateSchema, ValidationResult }

import scala.concurrent.Future
import scala.concurrent.duration._

trait AvroSchemaValidationRoutes extends JsonSupport {

  implicit def system: ActorSystem

  lazy val log = Logging(system, classOf[AvroSchemaValidationRoutes])

  def avroSchemaValidationActor: ActorRef

  implicit lazy val timeout = Timeout(5.seconds)

  lazy val avroSchemaValidationRoutes: Route =
    post {
      path("validate") {
        entity(as[AvroSchemaRequest]) { req =>
          val result: Future[ValidationResult] = (avroSchemaValidationActor ? ValidateSchema(req)).mapTo[ValidationResult]

          onSuccess(result) { validationResult =>

            complete((StatusCodes.OK, validationResult))
          }
        }
      }
    }
}
