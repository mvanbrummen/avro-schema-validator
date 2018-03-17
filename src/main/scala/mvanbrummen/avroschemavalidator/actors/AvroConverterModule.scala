package mvanbrummen.avroschemavalidator.actors

import tech.allegro.schema.json2avro.converter.JsonAvroConverter

trait AvroConverterModule {
  import com.softwaremill.macwire._

  lazy val converter = wire[JsonAvroConverter]
}
