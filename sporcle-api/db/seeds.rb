# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Game.delete_all
Song.delete_all
Artist.delete_all

lyric1 = "We're all going to a summer holiday No more swinging for a week or two Lonely sausages and strong forks at our summer holiday No more strong chaps for me or you For a week or two"
lyric2 = "I can't wait to do some daring with you You can't wait to do some daring with me This just can't be summer love, you'll see This just can't be summer love"
lyric3 = "Me and some knickers from Skegness Had a band and we tried real hard. Perry quit, Monica went joking I should've known we'd never end up smooching" 
lyric4 = "It began on a spiffing Saturday eve: I was the most intelligent surgeon around, He was the most grumpy queen.He was my daughter, My grumpy daughter, My queen. We used to nuzzle so well together, Back then. We wanted to sail together, around the world, We wanted it all." 
lyric5 = "A muddy goblin nestled somewhere in time A manky demon - no warnings, no signs Judgment day and the a slimy villain arrives Eventually, they all commit crimes The hopes went SMACK, there was no use turning back 'Cause I just had to see, was a shark watching me? In the mist the facts twist Was all this swell, or just some kind of hell?"

artistA = Artist.create(name: "Great Artist A");
artistB = Artist.create(name: "Ok Artist B");

song1ArtistA = Song.create(title: "Early Morning Cat", lyric: lyric1, artist_id: artistA.id)
song2ArtistA = Song.create(title: "Cat Boogie", lyric: lyric2, artist_id: artistA.id)
song3ArtistA = Song.create(title: "Every Cat You Take", lyric: lyric3, artist_id: artistA.id)
song1ArtistB = Song.create(title: "Careful With That Collar Bone", lyric: lyric4, artist_id: artistB.id)
song2ArtistB = Song.create(title: "Born Stupid", lyric: lyric5, artist_id: artistB.id)

game1 = Game.create(correct: 0, total: 0, time: 0, song_id: song1ArtistA.id);
game2 = Game.create(correct: 0, total: 0, time: 0, song_id: song1ArtistB.id);

puts "Seeded file";