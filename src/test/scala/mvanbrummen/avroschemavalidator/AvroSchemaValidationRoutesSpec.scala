package mvanbrummen.avroschemavalidator


import akka.actor.ActorRef
import akka.http.scaladsl.marshalling.Marshal
import akka.http.scaladsl.model._
import akka.http.scaladsl.testkit.ScalatestRouteTest
import org.scalatest.concurrent.ScalaFutures
import org.scalatest.{Matchers, WordSpec}

class AvroSchemaValidationRoutesSpec extends WordSpec with Matchers with ScalaFutures with ScalatestRouteTest
  with AvroSchemaValidationRoutes {

  override val avroSchemaValidationActor: ActorRef =
    system.actorOf(AvroSchemaValidatorActor.props, "avroSchemaValidatorActor")

  lazy val routes = avroSchemaValidationRoutes

  "Avro schema validation routes" should {
    "be able to validate schemas (POST /validate)" in {
      val schema =
        """
          |{"type":"record", "name": "Acme", "fields": [{"name": "username","type": "string"}]}
          |
        """.stripMargin

      val json =
        """
          | {"username": "Mike"}
        """.stripMargin

      val avroSchemaRequest = AvroSchemaRequest(schema, json)
      val avroSchemaRequestEntity = Marshal(avroSchemaRequest).to[MessageEntity].futureValue

      val request = Post("/validate").withEntity(avroSchemaRequestEntity)

      request ~> routes ~> check {
        status should ===(StatusCodes.OK)

        contentType should ===(ContentTypes.`application/json`)

        entityAs[String] should ===("""{"valid":true}""")
      }
    }
    "be able to validate invalid schema (POST /validate)" in {
      val schema =
        """
          |{"type":"record", "name": "Acme", "fields": [{"name": "username","type": "string"},{"name": "email","type": "string"}]}
          |
        """.stripMargin

      val json =
        """
          | {"username": "Mike"}
        """.stripMargin

      val avroSchemaRequest = AvroSchemaRequest(schema, json)
      val avroSchemaRequestEntity = Marshal(avroSchemaRequest).to[MessageEntity].futureValue

      val request = Post("/validate").withEntity(avroSchemaRequestEntity)

      request ~> routes ~> check {
        status should ===(StatusCodes.OK)

        contentType should ===(ContentTypes.`application/json`)

        entityAs[String] should ===("""{"valid":false,"message":"Failed to convert JSON to Avro"}""")
      }
    }
  }
}
