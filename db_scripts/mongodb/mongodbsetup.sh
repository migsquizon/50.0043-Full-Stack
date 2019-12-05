sudo mongo -u Admin << EOF
use Kindle
db.createCollection('Metadata')
db.createCollection('user_data')
db.createCollection('logs')
db.Metadata.createIndex( { asin: 1 } )
db.Metadata.createIndex( { categories: 1 } )
EOF
wget -c https://istd50043.s3-ap-southeast-1.amazonaws.com/meta_kindle_store.zip -O meta_kindle_store.zip
sudo apt install unzip
unzip meta_kindle_store.zip
rm -rf *.zip
sudo mongoimport --legacy -d Kindle -c Metadata < meta_Kindle_Store.json