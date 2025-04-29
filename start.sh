#!/bin/bash

# Construire le projet
echo " Construction du projet (build.sh)..."
./build.sh

# Vérifier que la construction s'est bien passée
if [ $? -eq 0 ]; then
  echo " Build terminé. Lancement du serveur local sur dist/..."
  cd dist
  live-server
else
  echo " Erreur pendant le build. Serveur non lancé."
fi
