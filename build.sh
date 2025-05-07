#!/bin/bash

SOURCE_DIR="./frontend"
DIST_DIR="./dist"
CSS_DIR="$SOURCE_DIR/css"
MODULES_DIR="$SOURCE_DIR/modules"
JS_DIR="$SOURCE_DIR/js"
ASSETS_DIR="$SOURCE_DIR/assets"
JS_MAIN="$SOURCE_DIR/main.js"

# Nettoyer ancien dist
[ -d "$DIST_DIR" ] && rm -rf "$DIST_DIR"

# Créer nouvelle structure dist
mkdir -p "$DIST_DIR/css"
mkdir -p "$DIST_DIR/modules"
mkdir -p "$DIST_DIR/js"     # ➔ Ajouté ici
mkdir -p "$DIST_DIR/assets"

# Copier assets (images etc)
echo " Copie des assets..."
cp -r "$ASSETS_DIR/"* "$DIST_DIR/assets/"

# Copier modules JS
echo " Copie des modules JS..."
cp -r "$MODULES_DIR/"* "$DIST_DIR/modules/"

# Copier JS utilitaires (api.js, utils.js)
echo " Copie des fichiers JS (api, utils)..."
cp -r "$JS_DIR/"* "$DIST_DIR/js/"

# Minifier CSS
echo " Minification du CSS..."
cleancss -o "$DIST_DIR/css/style.min.css" "$CSS_DIR/style.css"
cleancss -o "$DIST_DIR/css/modal.min.css" "$CSS_DIR/modal.css"
cleancss -o "$DIST_DIR/css/variables.min.css" "$CSS_DIR/variables.css"

# Minifier JavaScript principal
echo " Minification de main.js..."
terser "$JS_MAIN" -o "$DIST_DIR/main.min.js" --compress --mangle

# Corriger l'index HTML
echo " Préparation de l'index HTML..."
cat "$SOURCE_DIR/index_bootstrap.html" \
  | sed -e 's/css\/style.css/css\/style.min.css/g' \
        -e 's/css\/modal.css/css\/modal.min.css/g' \
        -e 's/css\/variables.css/css\/variables.min.css/g' \
        -e 's/main.js/main.min.js/g' \
  > "$DIST_DIR/index_bootstrap.html"

echo -e "\e[32m Build terminé avec succès dans dist/ !\e[0m"
