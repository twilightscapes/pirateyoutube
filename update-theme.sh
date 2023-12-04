#!/bin/bash

# Set the URL of your central repository
THEME_REPO_URL="https://github.com/piratesocial/pirateplus"

# Set the branch or tag you want to pull updates from
BRANCH_OR_TAG="main"

# Temporarily store the user's changes (optional)
mv src user_src_backup

# Clone the central repository
git clone --branch $BRANCH_OR_TAG --depth 1 $THEME_REPO_URL tmp_theme

# Replace the src folder
rm -rf src
mv tmp_theme/src .

# Copy the package.json file
cp tmp_theme/package.json .

# Clean up
rm -rf tmp_theme
rm -rf user_src_backup

echo "Theme updated successfully!"
