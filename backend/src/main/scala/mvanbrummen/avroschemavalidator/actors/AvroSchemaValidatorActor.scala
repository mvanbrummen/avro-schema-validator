package mvanbrummen.avroschemavalidator.actors

import akka.actor.{ Actor, ActorLogging, Props }

import scala.util.{ Failure, Success, Try }

final case class AvroSchemaRequest(schema: String, json: String)

object AvroSchemaValidatorActor {

  final case class ValidateSchema(request: AvroSchemaRequest)

  final case class ValidationResult(valid: Boolean, message: Option[String])

  def props: Props = Props[AvroSchemaValidatorActor]
}

class AvroSchemaValidatorActor extends Actor with ActorLogging with AvroConverterModule {

  import AvroSchemaValidatorActor._

  override def receive: Receive = {
    case ValidateSchema(request) =>
      val result = Try(converter.convertToAvro(request.json.getBytes(), request.schema))

      val validationResult = result match {
        case Success(_) => ValidationResult(valid = true, None)
        case Failure(e) => ValidationResult(valid = false, Some(e.getMessage))
      }

      sender() ! validationResult

    case _ => log.debug("Unknown request")
  }
}
