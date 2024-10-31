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
    image = "mixxy4k/owo"
    name = "owo_app"
    ports {
        internal = 80
        external = 80
    }
}

# # docker provider via ssh
# provider "docker" {
#     host = "ssh://artur@20.215.200.155"
#     passw
    
# }