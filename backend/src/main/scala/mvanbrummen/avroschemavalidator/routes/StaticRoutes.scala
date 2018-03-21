package mvanbrummen.avroschemavalidator.routes

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives.{ get, getFromResource, getFromResourceDirectory, pathEndOrSingleSlash, pathPrefix, redirectToTrailingSlashIfMissing, _ }
import akka.http.scaladsl.server.Route

trait StaticRoutes {
  lazy val staticResourcesRoutes: Route =
    get {
      (pathEndOrSingleSlash & redirectToTrailingSlashIfMissing(StatusCodes.TemporaryRedirect)) {
        getFromResource("static/build/index.html")
      } ~ {
        getFromResourceDirectory("static/build")
      }
    }
}
