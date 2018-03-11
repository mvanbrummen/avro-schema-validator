package mvanbrummen.avroschemavalidator

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import mvanbrummen.avroschemavalidator.AvroSchemaValidatorActor.ValidationResult
import spray.json.DefaultJsonProtocol

trait JsonSupport extends SprayJsonSupport {

  import DefaultJsonProtocol._

  implicit val requestJsonFormat = jsonFormat2(AvroSchemaRequest)
  implicit val resultJsonFormat = jsonFormat2(ValidationResult)

}

