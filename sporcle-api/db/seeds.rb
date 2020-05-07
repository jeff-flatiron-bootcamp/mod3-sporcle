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
'Cause baby now we got bad blood"


artistA = Artist.create(name: "Rick Astley");
artistB = Artist.create(name: "Taylor Swift");

song1ArtistA = Song.create(title: "Never Gonna Give You Up", lyric: astley_lyric, artist_id: artistA.id)
song1ArtistA = Song.create(title: "Shake It Off", lyric: swift_lyric_1, artist_id: artistB.id)
song1ArtistA = Song.create(title: "Never Gonna Give You Up", lyric: swift_lyric_2, artist_id: artistB.id)

puts "Seeded file";
