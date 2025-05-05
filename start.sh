#!/bin/bash

# Construire le projet
echo " Construction du projet (build.sh)..."
./build.sh

# Vérifier que la construction s'est bien passée
if [ $? -eq 0 ]; then
  echo " Build terminé avec succès."
  echo " Lancement du serveur local (live-server) sur dist/..."

  # Se placer dans le dossier dist
  cd dist

  # Vérifier que live-server est installé
  if command -v live-server > /dev/null 2>&1; then
    live-server --port=8080
  else
    echo " Erreur : live-server n'est pas installé."
    echo " Installez-le avec : npm install -g live-server"
    exit 1
  fi

else
  echo " Erreur pendant la construction. Le serveur n'est pas lancé."
  exit 1
fi
