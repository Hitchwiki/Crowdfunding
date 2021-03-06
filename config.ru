# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment',  __FILE__)

use Rack::Deflater

use Rack::Static,
  :urls => ["/images"],
  :root => "public"


run Selfstarter::Application
