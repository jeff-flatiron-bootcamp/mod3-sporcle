# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Guess.delete_all
Game.delete_all
Song.delete_all
Artist.delete_all

astley_lyric = "Never gonna give you up, Never gonna let you down,
Never gonna run around and desert you,
Never gonna make you cry,
Never gonna say goodbye.
Never gonna tell a lie and hurt you"

swift_lyric_1 = "Cause the players gonna play, play, play, play, play
And the haters gonna hate, hate, hate, hate, hate
Baby, I'm just gonna shake, shake, shake, shake, shake
I shake it off, I shake it off"

swift_lyric_2 = "Cause baby now we got bad blood
You know it used to be mad love
So take a look at what you've done
Cause baby now we got bad blood"

eagles_lyric_1 = "Welcome to the Hotel California
Such a lovely place (such a lovely place)
Such a lovely face
Plenty of room at the Hotel California
Any time of year (any time of year)
You can find it here"

feist_lyric = "Oh, uh, oh, you're changing your heart
Oh, uh, oh, you know who you are"

winehouse_lyric = "He walks away
The sun goes down
He takes the day, but I'm grown
And in your way
In this blue shade
My tears dry on their own"


artistA = Artist.create(name: "Rick Astley");
artistB = Artist.create(name: "Taylor Swift");
artistC = Artist.create(name: "The Eagles")
artistD = Artist.create(name: "Feist")
artistE = Artist.create(name: "Amy Winehouse")

song1ArtistA = Song.create(title: "Never Gonna Give You Up", lyric: astley_lyric, artist_id: artistA.id, url:"https://www.youtube.com/embed/oHg5SJYRHA0")
song1ArtistB = Song.create(title: "Shake It Off", lyric: swift_lyric_1, artist_id: artistB.id,url:"https://www.youtube.com/embed/nfWlot6h_JM")
song2ArtistB = Song.create(title: "Bad Blood", lyric: swift_lyric_2, artist_id: artistB.id,url:"https://www.youtube.com/embed/QcIy9NiNbmo")
song1ArtistC = Song.create(title: "Hotel California", lyric: eagles_lyric_1, artist_id: artistC.id,url:"https://www.youtube.com/embed/nY2INMutWxk")
song1ArtistD = Song.create(title: "1234", lyric: feist_lyric, artist_id: artistD.id,url:"https://www.youtube.com/embed/ABYnqp-bxvg")
song1ArtistE = Song.create(title: "Tears Dry On Their Own", lyric: winehouse_lyric, artist_id: artistE.id, url:"https://www.youtube.com/embed/ojdbDYahiCQ")

puts "Seeded file";
