#!/bin/bash

# # Check for uncommitted changes
# if ! git diff-index --quiet HEAD --; then
#   echo "Error: You have uncommitted changes. Please commit or stash them before updating."
#   exit 1
# fi

# # Backup user changes
# mv src user_src_backup

# # Set the URL of your central repository
# THEME_REPO_URL="https://github.com/piratesocial/pirateplus"

# # Set the branch or tag you want to pull updates from
# BRANCH_OR_TAG="main"

# # Clone the central repository
# git clone --branch $BRANCH_OR_TAG --depth 1 $THEME_REPO_URL tmp_theme

# # Replace the src folder
# rm -rf src
# mv tmp_theme/src .

# # Update the admin/config.yml file
# cp tmp_theme/static/admin/config.yml static/admin/

# # Copy the package.json file
# cp tmp_theme/package.json .

# # Clean up
# rm -rf tmp_theme

# echo "Theme updated successfully!"


echo "No Theme Updated - Needed"
