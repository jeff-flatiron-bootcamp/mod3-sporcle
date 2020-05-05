Rails.application.routes.draw do
  post '/games/hint', to: 'games#hint'
  resources :games
  resources :songs
  resources :artists
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
