terraform {
    required_version = ">= 0.12"
    required_providers {
        docker = {
            source = "kreuzwerker/docker"
            version = "2.13.0"
        }
    }
}

resource "docker_container" "owo_app" {
    image = "mixxy3k/owo"
    name = "owo_app"
    ports {
        internal = 80
        external = 80
    }
}

provider docker {
    host = host = "tcp://20.215.200.155:2375"
    password = {var.docker_password}
}

variable "docker_password" {
  type        = string
  default     = "password"
  description = "description"
  sensitive   = true
}
