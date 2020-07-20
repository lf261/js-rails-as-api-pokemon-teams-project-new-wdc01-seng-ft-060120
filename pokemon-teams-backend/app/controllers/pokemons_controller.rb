class PokemonsController < ApplicationController
    
  # def show
  #   pokemon = Pokemon.find_by(params[:id])
  #   render json: pokemon
  # end
  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    poke = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    render json: poke, :except => [:updated_at,:created_at]
  end

end
