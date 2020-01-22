# Pull the latest changes
echo ">> pulling lateset changes"
git pull

# Update any tools
echo ">> updating tools"
asdf install

# Build the application
echo ">> building application"
shards build mcsn
