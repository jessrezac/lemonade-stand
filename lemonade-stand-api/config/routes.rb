Rails.application.routes.draw do
  
  namespace :api do
    namespace :v1 do
      resources :games, only: [:index, :create, :update, :delete]
    end
  end
  
end
